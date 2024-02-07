import argparse
import logging
import os
from datetime import datetime

import django
import pandas as pd

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_app.settings')
django.setup()

# Import your models after setting up Django
from projects.models import BioSample, Colony, Experiment, Observation, \
    Project, Publication
from users.models import CustomUser

# Configure the logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')


def parse_and_create_instances(csv_path, owner_username):
    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(csv_path)

    owner = CustomUser.objects.get(username=owner_username)

    for project_key, project_group in df.groupby('Project.name'):

        project, created = Project.objects.get_or_create(
            name=project_key,
            registration_date=datetime.now().date(),
            description='Datasheet cbass_84.csv',
            owner=owner
        )
        logging.info(f"{project}, created: {created}")

        for experiment_key, experiment_group in project_group.groupby(
                ['Experiment.name', 'Experiment.date']):
            experiment, created = Experiment.objects.get_or_create(
                name=experiment_key[0],
                project=project,
                date=datetime.strptime(experiment_key[1],
                                       '%Y-%m-%d').date())
            logging.info(f"{experiment}, created: {created}")

            for colony_key, colony_group in experiment_group.groupby(
                    ['Colony.name', 'Colony.species', 'Colony.country',
                     'Colony.latitude', 'Colony.longitude'
                     ]):
                colony, created = Colony.objects.get_or_create(
                    name=colony_key[0],
                    species=colony_key[1],
                    country=colony_key[2],
                    latitude=colony_key[3],
                    longitude=colony_key[4])
                logging.info(f"{colony}, created: {created}")

                for biosample_key, biosample_group in colony_group.groupby(
                        ['BioSample.name', 'BioSample.collection_date']):
                    biosample, created = BioSample.objects.get_or_create(
                        name=biosample_key[0],
                        collection_date=biosample_key[1],
                        colony=colony)
                    logging.info(f"{biosample}, created: {created}")

                    for _, row in biosample_group.iterrows():
                        observation, created = Observation.objects.get_or_create(
                            biosample=biosample,
                            experiment=experiment,
                            condition=row['Observation.condition'],
                            temperature=row['Observation.temperature'],
                            timepoint=row['Observation.timepoint'],
                            pam_value=row['Observation.pam_value'])
                        logging.info(f"{observation}, created: {created}")

                        publication, created = Publication.objects.get_or_create(
                            title=row['Publication.title'],
                            year=row['Publication.year'],
                            doi=row['Publication.doi']
                        )

                        observation.publications.add(publication)
                        publication.projects.add(project)

                        logging.info(f"{publication}, created: {created}")


def main():
    parser = argparse.ArgumentParser(
        description='Parse CSV and create instances in Django models.')
    parser.add_argument('--csv_path', type=str, required=True,
                        help='Path to the input CSV file')
    parser.add_argument('--owner', type=str, required=True,
                        help='Username of the owner for the datasheet')

    args = parser.parse_args()

    # Call the function to parse and create instances
    parse_and_create_instances(args.csv_path, args.owner)


if __name__ == "__main__":
    main()
