import os
import django
import pandas as pd

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_app.settings')
django.setup()

# Import your models after setting up Django
from projects.models import Project, Sample, Experiment, Observation
from users.models import CustomUser
from datetime import datetime

def parse_and_create_instances(csv_path):
    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(csv_path)

    project = Project.objects.create(
        name='Example Project',
        registration_date=datetime.now().date(),
        description='Project Description',
        owner=CustomUser.objects.get(id=1)
    )

    # Iterate over unique experiments
    for experiment_key, experiment_group in df.groupby(['Experiment', 'Experiment Date']):
        experiment_name, experiment_date = experiment_key
        # Create Experiment instance
        experiment = Experiment.objects.create(
            project=project,
            experiment_date=datetime.strptime(experiment_date, '%Y-%m-%d').date(),
        )

        # Iterate over unique samples within the experiment
        for sample_key, sample_group in experiment_group.groupby(['Sample', 'Country', 'Species', 'Latitude', 'Longitude', 'Collection Date']):
            sample = Sample.objects.create(
                project=project,
                country=sample_key[1],
                species=sample_key[2],
                latitude=sample_key[3],
                longitude=sample_key[4],
                collection_date=datetime.strptime(sample_group['Collection Date'].iloc[0], '%Y-%m-%d').date(),
            )
            # Associate the sample with the experiment
            experiment.samples.add(sample)

            # Iterate over observations within the sample
            for _, row in sample_group.iterrows():
                pass
                observation = Observation.objects.create(
                    sample=sample,
                    replicate=row['Replicate'],
                    condition=row['Condition'],
                    temperature=row['Temperature'],
                    timepoint=row['Timepoint'],
                    pam_value=row['PAM'],
                )
                print(f"Created Observation: {observation}")

if __name__ == "__main__":
    # Provide the path to your CSV file
    # csv_file_path = 'example.csv'
    csv_file_path = 'static/datasheets/cbass_84.csv'

    # Call the function to parse and create instances
    parse_and_create_instances(csv_file_path)
