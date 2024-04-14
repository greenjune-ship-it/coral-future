from datetime import datetime

from projects.models import BioSample, Colony, ThermalTolerance, \
    Experiment, Observation, Project, Publication


def create_project(owner, project_key, description):
    if project_key == 'Voolstra et al. 2021':
        registration_date = datetime.strptime('2023-12-31', '%Y-%m-%d').date()
    elif project_key == 'Evensen et al. 2022':
        registration_date = datetime.strptime('2024-02-01', '%Y-%m-%d').date()
    elif project_key == '2022 Fiji Jareis':
        registration_date = datetime.strptime('2024-04-14', '%Y-%m-%d').date()
    else:
        registration_date = datetime.now().date()
    return Project.objects.get_or_create(
        name=project_key,
        registration_date=registration_date,
        description=description,
        owner=owner)


def create_experiment(project, experiment_key):
    return Experiment.objects.get_or_create(
        name=experiment_key[0],
        project=project,
        date=datetime.strptime(experiment_key[1], '%Y-%m-%d').date())


def create_colony(colony_key):
    return Colony.objects.get_or_create(
        name=colony_key[0],
        species=colony_key[1],
        country=colony_key[2],
        latitude=colony_key[3],
        longitude=colony_key[4])


def create_thermaltolerance(colony, ed50_value):
    return ThermalTolerance.objects.get_or_create(
        colony=colony,
        abs_thermal_tolerance=ed50_value)


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
