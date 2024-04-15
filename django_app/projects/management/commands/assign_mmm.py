import subprocess
import sys

import pandas as pd
from django.core.management.base import BaseCommand
from projects.models import Colony


class Command(BaseCommand):
    help = 'Extract the maximum monthly mean (MMM) and assign to colonies'

    def handle(self, *args, **kwargs):

        coordinates_file = "/tmp/coordinates.tsv"
        sst_clim_mmm_file = "/tmp/sst_clim_mmm.tsv"

        colonies = Colony.objects.all()

        self.get_colony_coords(colonies, coordinates_file)
        self.get_sst_clim_mmm(coordinates_file, sst_clim_mmm_file)
        self.populate_db_with_mmm(colonies, sst_clim_mmm_file)

    def get_colony_coords(self, colonies, outfile):
        coordinates = set(
            [(colony.latitude, colony.longitude) for colony in colonies])

        df = pd.DataFrame(coordinates, columns=["Latitude", "Longitude"])
        df.to_csv(outfile, sep="\t", index=False, header=False)
        self.stdout.write(
            self.style.SUCCESS(f'Coordinates saved to {outfile}'))

    def get_sst_clim_mmm(self, infile, outfile):
        command = f'cwsample -H -V sst_clim_mmm -S {infile} /usr/src/ct5km_climatology_v3.1.nc {outfile}'

        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE,
                                   stderr=subprocess.PIPE)
        stdout, stderr = process.communicate()

        if process.returncode == 0:
            self.stdout.write(
                self.style.SUCCESS(
                    f'Command executed successfully! Output file: {outfile}'))
        else:
            sys.stdout.write(self.style.ERROR(
                f'Error executing command: {stderr.decode("utf-8")}'))

    def populate_db_with_mmm(self, colonies, infile):
        df = pd.read_csv(infile, delim_whitespace=True)

        for index, row in df.iterrows():
            latitude = row['latitude']
            longitude = row['longitude']
            sst_clim_mmm = row['sst_clim_mmm']

            colonies = Colony.objects.filter(latitude=latitude,
                                             longitude=longitude)

            # Assign MMM to each Colony object
            for colony in colonies:
                for thermal_tolerance in colony.thermal_tolerances.all():
                    thermal_tolerance._sst_clim_mmm = sst_clim_mmm
                    if (
                            colony.latitude == 29.500000 or colony.latitude == 29.501771) and (
                            colony.longitude == 34.933330 or colony.longitude == 34.917925):
                        thermal_tolerance._sst_clim_mmm = 27.01
                    thermal_tolerance.save()

                    self.stdout.write(
                        f'MMM are assigned to colony: {colony.name}')
