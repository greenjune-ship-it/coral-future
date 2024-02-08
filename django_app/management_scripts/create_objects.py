import pandas as pd
from datetime import datetime

from projects.models import BioSample, Colony, Experiment, Observation, \
    Project, Publication


def create_project(owner, project_key):
    return Project.objects.get_or_create(
        name=project_key,
        registration_date=datetime.now().date(),
        description='Datasheet cbass_84.csv',
        owner=owner)


def create_experiment(project, experiment_key):
    return Experiment.objects.get_or_create(
        name=experiment_key[0],
        project=project,
        date=datetime.strptime(experiment_key[1], '%Y-%m-%d').date())


def create_colony(colony_key):
    ed50 = colony_key[5] if not pd.isnull(colony_key[5]) else None

    return Colony.objects.get_or_create(
        name=colony_key[0],
        species=colony_key[1],
        country=colony_key[2],
        latitude=colony_key[3],
        longitude=colony_key[4],
        ed50_value=ed50
    )


def create_biosample(colony, biosample_key):
    return BioSample.objects.get_or_create(
        name=biosample_key[0],
        collection_date=biosample_key[1],
        colony=colony)


def create_observation(experiment, biosample, row):
    return Observation.objects.get_or_create(
        experiment=experiment,
        biosample=biosample,
        condition=row['Observation.condition'],
        temperature=row['Observation.temperature'],
        timepoint=row['Observation.timepoint'],
        pam_value=row['Observation.pam_value'])


def create_publication(row):
    return Publication.objects.get_or_create(
        title=row['Publication.title'],
        year=row['Publication.year'],
        doi=row['Publication.doi'])
