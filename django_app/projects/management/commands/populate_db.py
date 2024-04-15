import os
import sys
import pandas as pd

from django.core.management.base import BaseCommand

from users.models import CustomUser
from projects.models import BioSample, Observation

from projects.management.commands.utils._create_objects import (
    create_biosample, create_colony, create_thermaltolerance, create_experiment,
    create_observation, create_project, create_publication)

from projects.management.commands.utils._validate_datasheet import validate_datasheet


class Command(BaseCommand):
    help = 'Parse CSV and create instances in Django models.'

    def add_arguments(self, parser):
        parser.add_argument('--csv_path', type=str, required=True,
                            help='Path to the input CSV file')
        parser.add_argument('--owner', type=str, required=True,
                            help='Username of the owner for the datasheet')
        parser.add_argument('--no-pam', action='store_true',
                            help='Flag to indicate no PAM values are provided')

    def handle(self, *args, **kwargs):
        csv_path = kwargs['csv_path']
        owner_username = kwargs['owner']
        use_pam = not kwargs['no_pam']

        try:
            owner = CustomUser.objects.get(username=owner_username)
        except CustomUser.DoesNotExist:
            sys.stdout.write(f"User '{owner_username}' does not exist.\n")
            return

        try:
            df = pd.read_csv(csv_path)
        except FileNotFoundError:
            sys.stdout.write(f"CSV file not found at '{csv_path}'.\n")
            return

        validate_datasheet(df)
        self.create_instances(df, owner, csv_path, use_pam)

    def create_instances(self, df, owner, csv_path, use_pam):
        for _, row in df.iterrows():
            project, created = create_project(
                owner, row['Project.name'],
                description=f'Datasheet {os.path.basename(csv_path)}')

            sys.stdout.write(f"Project: {project}, created: {created}\n")

            experiment, created = create_experiment(project, (
                row['Experiment.name'], row['Experiment.date']))
            sys.stdout.write(f"Experiment: {experiment}, created: {created}\n")

            colony, created = create_colony((row['Colony.name'],
                                             row['Colony.species'],
                                             row['Colony.country'],
                                             row['Colony.latitude'],
                                             row['Colony.longitude']))
            sys.stdout.write(f"Colony: {colony}, created: {created}\n")

            thermal_tolerance, created = create_thermaltolerance(
                colony=colony,
                ed50_value=row['Colony.ed50_value'] if not pd.isnull(
                    row['Colony.ed50_value']) else None
            )

            if use_pam:
                biosample, created = create_biosample(colony, (
                    row['BioSample.name'], row['BioSample.collection_date']))
                sys.stdout.write(
                    f"Biosample: {biosample}, created: {created}\n")

                observation, created = create_observation(experiment, biosample,
                                                          row)
                sys.stdout.write(
                    f"Observation: {observation}, created: {created}\n")

                publication, created = create_publication(row)
                sys.stdout.write(
                    f"Publication: {publication}, created: {created}\n")

                publication.biosamples.add(biosample)
                project.publications.add(publication)
                project.biosamples.add(biosample)
                thermal_tolerance.observations.add(observation)
            else:
                for temp in [30, 33, 36, 39]:
                    biosample, created = BioSample.objects.get_or_create(
                        name=f"{colony.name}-{temp}",
                        collection_date=experiment.date,
                        colony=colony
                    )
                    sys.stdout.write(
                        f"Biosample: {biosample}, created: {created}\n")

                    observation, created = Observation.objects.get_or_create(
                        experiment=experiment,
                        biosample=biosample,
                        condition=row['Observation.condition'],
                        temperature=temp,
                        timepoint=row['Observation.timepoint'],
                    )
                    sys.stdout.write(
                        f"Observation: {observation}, created: {created}\n")

                    publication, created = create_publication(row)
                    sys.stdout.write(
                        f"Publication: {publication}, created: {created}\n")

                    publication.biosamples.add(biosample)
                    project.publications.add(publication)
                    project.biosamples.add(biosample)
                    thermal_tolerance.observations.add(observation)
