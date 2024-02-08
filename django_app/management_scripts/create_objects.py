import logging
from datetime import datetime

from projects.models import BioSample, Colony, Experiment, Observation, \
    Project, Publication


def create_project(owner, project_key):
    """
    Create or get a Project instance.

    Args:
        owner (CustomUser): Owner of the project.
        project_key (str): Name of the project.

    Returns:
        Project: Created or retrieved Project instance.
    """
    return Project.objects.get_or_create(
        name=project_key,
        registration_date=datetime.now().date(),
        description='Datasheet cbass_84.csv',
        owner=owner
    )


def create_experiment(project, experiment_key):
    """
    Create or get an Experiment instance.

    Args:
        project (Project): Project instance.
        experiment_key (tuple): Tuple containing experiment name and date.

    Returns:
        Experiment: Created or retrieved Experiment instance.
    """
    logging.info(f"Experiment key: {experiment_key[0]}, {experiment_key[1]}")
    return Experiment.objects.get_or_create(
        name=experiment_key[0],
        project=project,
        date=datetime.strptime(experiment_key[1], '%Y-%m-%d').date()
    )


def create_colony(colony_key):
    """
    Create or get a Colony instance.

    Args:
        colony_key (tuple): Tuple containing colony attributes.

    Returns:
        Colony: Created or retrieved Colony instance.
    """
    return Colony.objects.get_or_create(
        name=colony_key[0],
        species=colony_key[1],
        country=colony_key[2],
        latitude=colony_key[3],
        longitude=colony_key[4]
    )


def create_biosample(colony, biosample_key):
    """
    Create or get a BioSample instance.

    Args:
        colony (Colony): Colony instance.
        biosample_key (tuple): Tuple containing biosample name and collection date.

    Returns:
        BioSample: Created or retrieved BioSample instance.
    """
    return BioSample.objects.get_or_create(
        name=biosample_key[0],
        collection_date=biosample_key[1],
        colony=colony
    )


def create_observation(biosample, experiment, row):
    """
    Create or get an Observation instance.

    Args:
        biosample (BioSample): BioSample instance.
        experiment (Experiment): Experiment instance.
        row (pd.Series): Series containing observation data.

    Returns:
        Observation: Created or retrieved Observation instance.
    """
    return Observation.objects.get_or_create(
        biosample=biosample,
        experiment=experiment,
        condition=row['Observation.condition'],
        temperature=row['Observation.temperature'],
        timepoint=row['Observation.timepoint'],
        pam_value=row['Observation.pam_value']
    )


def create_publication(row, project):
    """
    Create or get a Publication instance.

    Args:
        row (pd.Series): Series containing publication data.
        project (Project): Project instance.

    Returns:
        Publication: Created or retrieved Publication instance.
    """
    publication, created = Publication.objects.get_or_create(
        title=row['Publication.title'],
        year=row['Publication.year'],
        doi=row['Publication.doi']
    )
    publication.projects.add(project)
    return publication, created
