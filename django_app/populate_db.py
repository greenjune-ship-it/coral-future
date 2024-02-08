import argparse
import logging
import os

import django
import pandas as pd

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_app.settings')
django.setup()

# Import your models after setting up Django
from management_scripts.create_objects import (
    create_biosample, create_colony, create_experiment, create_observation,
    create_project, create_publication
)
from users.models import CustomUser
from projects.models import BioSample, Observation

# Configure the logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def parse_csv(csv_path):
    return pd.read_csv(csv_path)


def create_instances(df, owner, use_pam):
    for _, row in df.iterrows():
        project, created = create_project(owner, row['Project.name'])
        logging.info(f"Project: {project}, created: {created}")

        experiment, created = create_experiment(project, (row['Experiment.name'], row['Experiment.date']))
        logging.info(f"Experiment: {experiment}, created: {created}")

        colony, created = create_colony((row['Colony.name'], row['Colony.species'], row['Colony.country'],
                                         row['Colony.latitude'], row['Colony.longitude'], row['Colony.ed50_value']))
        logging.info(f"Colony: {colony}, created: {created}")

        if use_pam:
            biosample, created = create_biosample(colony, (row['BioSample.name'], row['BioSample.collection_date']))
            logging.info(f"Biosample: {biosample}, created: {created}")

            observation, created = create_observation(experiment, biosample, row)
            logging.info(f"Observation: {observation}, created: {created}")

            publication, created = create_publication(row)
            logging.info(f"Publication: {publication}, created: {created}")

            publication.biosamples.add(biosample)
            project.publications.add(publication)
            project.biosamples.add(biosample)
        else:
            for temp in [30, 33, 36, 39]:
                biosample, created = BioSample.objects.get_or_create(
                    name=f"{colony.name}-{temp}",
                    collection_date=experiment.date,
                    colony=colony
                )
                logging.info(f"Biosample: {biosample}, created: {created}")

                observation, created = Observation.objects.get_or_create(
                    experiment=experiment,
                    biosample=biosample,
                    condition=row['Observation.condition'],
                    temperature=temp,
                    timepoint=row['Observation.timepoint'],
                )
                logging.info(f"Observation: {observation}, created: {created}")

                publication, created = create_publication(row)
                logging.info(f"Publication: {publication}, created: {created}")

                publication.biosamples.add(biosample)
                project.publications.add(publication)
                project.biosamples.add(biosample)


def main():
    parser = argparse.ArgumentParser(description='Parse CSV and create instances in Django models.')
    parser.add_argument('--csv_path', type=str, required=True, help='Path to the input CSV file')
    parser.add_argument('--owner', type=str, required=True, help='Username of the owner for the datasheet')
    parser.add_argument('--no-pam', action='store_true', help='Flag to indicate no PAM values are provided')

    args = parser.parse_args()

    # Call the function to parse CSV
    df = parse_csv(args.csv_path)

    # Get owner
    owner = CustomUser.objects.get(username=args.owner)

    # Call the function to create instances
    create_instances(df, owner, not args.no_pam)


if __name__ == "__main__":
    main()
