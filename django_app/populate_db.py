import os
import django
import pandas as pd
import argparse
from datetime import datetime

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_app.settings')
django.setup()

# Import your models after setting up Django
from projects.models import Project, BioSample, Experiment, Observation
from users.models import CustomUser

def parse_and_create_instances(csv_path, owner_username):
    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(csv_path)

    owner = CustomUser.objects.get(username=owner_username)

    project = Project.objects.create(
        name='Example Project',
        registration_date=datetime.now().date(),
        description='Project Description',
        owner=owner
    )

    # Iterate over unique experiments
    for experiment_key, experiment_group in df.groupby(['Experiment', 'Experiment Date']):
        experiment_name, experiment_date = experiment_key
        # Create Experiment instance
        experiment = Experiment.objects.create(
            project=project,
            experiment_date=datetime.strptime(experiment_date, '%Y-%m-%d').date(),
        )

        # Iterate over unique biosamples within the experiment
        for biosample_key, biosample_group in experiment_group.groupby(['BioSample', 'Country', 'Species', 'Latitude', 'Longitude', 'Collection Date']):
            biosample = BioSample.objects.create(
                project=project,
                country=biosample_key[1],
                species=biosample_key[2],
                latitude=biosample_key[3],
                longitude=biosample_key[4],
                collection_date=datetime.strptime(biosample_group['Collection Date'].iloc[0], '%Y-%m-%d').date(),
            )
            # Associate the biosample with the experiment
            experiment.biosamples.add(biosample)

            # Iterate over observations within the biosample
            for _, row in biosample_group.iterrows():
                pass
                observation = Observation.objects.create(
                    biosample=biosample,
                    fragment=row['Fragment'],
                    condition=row['Condition'],
                    temperature=row['Temperature'],
                    timepoint=row['Timepoint'],
                    pam_value=row['PAM'],
                )
                print(f"Created Observation: {observation}")

def main():
    parser = argparse.ArgumentParser(description='Parse CSV and create instances in Django models.')
    parser.add_argument('--csv_path', type=str, required=True, help='Path to the input CSV file')
    parser.add_argument('--owner', type=str, required=True, help='Username of the owner for the datasheet')

    args = parser.parse_args()

    # Call the function to parse and create instances
    parse_and_create_instances(args.csv_path, args.owner)

if __name__ == "__main__":
    main()
