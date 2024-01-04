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

    # Iterate over rows and create instances
    for _, row in df.iterrows():
        # Create or get the project

        # Create the experiment within the project
        experiment, _ = Experiment.objects.get_or_create(
            project=project,
            experiment_date=datetime.strptime(row['Experiment Date'],
                                              '%Y-%m-%d').date(),
        )

        # Create the sample within the experiment
        sample, _ = Sample.objects.get_or_create(
            project=project,
            country=row['Country'],
            species=row['Species'],
            latitude=row['Latitude'],
            longitude=row['Longitude'],
            collection_date=datetime.strptime(row['Collection Date'],
                                              '%Y-%m-%d').date(),
        )

        # Associate the sample with the experiment
        experiment.samples.add(sample)

        # Create the observation within the sample
        observation = Observation.objects.create(
            sample=sample,
            genotype=row['Genotype'],
            condition=row['Condition'],
            temperature=row['Temperature'],
            timepoint=row['Timepoint'],
            pam_value=row['PAM'],
        )

        print(f"Created Observation: {observation}")

if __name__ == "__main__":
    # Provide the path to your CSV file
    csv_file_path = 'example.csv'

    # Call the function to parse and create instances
    parse_and_create_instances(csv_file_path)
