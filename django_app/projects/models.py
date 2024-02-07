# projects/models.py
from django.db import models
from users.models import CustomUser


class Project(models.Model):
    """
    Project includes Experiment(s).
    """
    name = models.CharField(max_length=100)
    registration_date = models.DateField()
    description = models.TextField()
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                      related_name='owner_projects')
    members = models.ManyToManyField(CustomUser, related_name='members_projects')

    def __str__(self):
        return f"Project {self.id} called {self.name}"


class Experiment(models.Model):
    """
    Experiment includes Observation(s).
    """
    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE,
                                related_name='experiments')
    date = models.DateField()

    def __str__(self):
        return f"Experiment {self.id} from Project {self.project.name}"


class Colony(models.Model):
    """
    Colony includes BioSample(s).
    """
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=100)
    country = models.CharField(max_length=3)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return f"Colony {self.id} of {self.species} Species from {self.country} ({self.latitude}, {self.longitude})"


class BioSample(models.Model):
    """
    BioSample includes Observation(s).
    """
    name = models.CharField(max_length=100)
    collection_date = models.DateField()
    colony = models.ForeignKey(Colony, on_delete=models.CASCADE,
                               related_name='biosamples')

    def __str__(self):
        return f"BioSample {self.id} of Colony {self.colony.id}"


class Observation(models.Model):
    """
    Observation includes Publication(s).
    """
    biosample = models.ForeignKey(BioSample, on_delete=models.CASCADE,
                                  related_name='biosample_observations')
    experiment = models.ForeignKey(Experiment, on_delete=models.CASCADE,
                                   related_name='experiment_observations')
    publications = models.ManyToManyField('Publication',
                                          related_name='publication_observations')
    condition = models.CharField(max_length=100)
    temperature = models.IntegerField()
    timepoint = models.IntegerField()
    pam_value = models.FloatField()

    def __str__(self):
        return f"Observation {self.id} of Biosample {self.biosample.id}"

    def save(self, *args, **kwargs):
        # Ensure pam_value is not None before rounding
        if self.pam_value is not None:
            self.pam_value = round(self.pam_value, 3)
        super().save(*args, **kwargs)


class Publication(models.Model):
    """
    Publication includes Observation(s) and belongs to Project(s).
    """
    title = models.TextField()
    year = models.IntegerField()
    doi = models.CharField(max_length=100)
    observations = models.ManyToManyField(Observation,
                                          related_name='observation_publications')
    projects = models.ManyToManyField(Project,
                                      related_name='project_publications')

    def __str__(self):
        return f"Publication {self.id}, {self.doi}"


class UserCart(models.Model):
    owner = models.OneToOneField(CustomUser, on_delete=models.CASCADE,
                                 related_name='cart')
    items = models.ManyToManyField('Observation', related_name='carts')

    def __str__(self):
        return f"UserCart of {self.owner.username}, {self.items.count()} observations"
