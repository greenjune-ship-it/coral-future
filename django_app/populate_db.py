import argparse
import logging
import os

import django
import pandas as pd

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_app.settings')
django.setup()

# Import your models after setting up Django
from users.models import CustomUser
from management_scripts.create_objecs import create_biosample, create_colony, \
    create_experiment, create_observation, create_project, create_publication

# Configure the logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')


def parse_csv(csv_path):
    """
    Parse the CSV file into a pandas DataFrame.

    Args:
        csv_path (str): Path to the CSV file.

    Returns:
        pd.DataFrame: DataFrame containing CSV data.
    """
    return pd.read_csv(csv_path)


def create_instances_from_df(df, owner):
    """
    Create instances from DataFrame.

    Args:
        df (pd.DataFrame): DataFrame containing data.
        owner (CustomUser): Owner of the data.

    Returns:
        None
    """
    for project_key, project_group in df.groupby('Project.name'):
        project, created = create_project(owner, project_key)
        logging.info(f"{project}, created: {created}")

        for experiment_key, experiment_group in project_group.groupby(
                ['Experiment.name', 'Experiment.date']):
            experiment, created = create_experiment(project, experiment_key)
            logging.info(f"{experiment}, created: {created}")

            for colony_key, colony_group in experiment_group.groupby(
                    ['Colony.name', 'Colony.species', 'Colony.country',
                     'Colony.latitude', 'Colony.longitude'
                     ]):
                colony, created = create_colony(colony_key)
                logging.info(f"{colony}, created: {created}")

                for biosample_key, biosample_group in colony_group.groupby(
                        ['BioSample.name', 'BioSample.collection_date']):
                    biosample, created = create_biosample(colony,
                                                          biosample_key)
                    logging.info(f"{biosample}, created: {created}")

                    for _, row in biosample_group.iterrows():
                        print(row)
                        observation, created = create_observation(biosample,
                                                                  experiment,
                                                                  row)
                        logging.info(f"{observation}, created: {created}")

                        publication, created = create_publication(row, project)
                        logging.info(f"{publication}, created: {created}")

                        # Create Many-to-Many relations
                        observation.publications.add(publication)


def main():
    parser = argparse.ArgumentParser(
        description='Parse CSV and create instances in Django models.')
    parser.add_argument('--csv_path', type=str, required=True,
                        help='Path to the input CSV file')
    parser.add_argument('--owner', type=str, required=True,
                        help='Username of the owner for the datasheet')

    args = parser.parse_args()

    # Call the function to parse CSV
    df = parse_csv(args.csv_path)

    # Get owner
    owner = CustomUser.objects.get(username=args.owner)

    # Call the function to create instances
    create_instances_from_df(df, owner)


if __name__ == "__main__":
    main()
