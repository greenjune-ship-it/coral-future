# projects/models.py
from django.db import models
from users.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=100)
    registration_date = models.DateField()
    description = models.TextField()
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                              related_name='projects')

    def __str__(self):
        return f"Project {self.id} called {self.name}, owned by {self.owner}"


class Experiment(models.Model):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE,
                                related_name='experiments')
    date = models.DateField()

    def __str__(self):
        return f"Experiment {self.id} from Project {self.project.name}"


class Colony(models.Model):
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=100)
    country = models.CharField(max_length=3)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return f"Colony {self.id} of {self.species} Species from {self.country} ({self.latitude}, {self.longitude})"


class BioSample(models.Model):
    name = models.CharField(max_length=100)
    collection_date = models.DateField()
    colony = models.ForeignKey(Colony, on_delete=models.CASCADE,
                               related_name='biosamples')

    def __str__(self):
        return f"BioSample {self.id} of Colony {self.colony.id}"


class Observation(models.Model):
    biosample = models.ForeignKey(BioSample, on_delete=models.CASCADE,
                                  related_name='biosample_observations')
    experiment = models.ForeignKey(Experiment, on_delete=models.CASCADE,
                                  related_name='experiment_observations')
    condition = models.CharField(max_length=100)
    temperature = models.IntegerField()
    timepoint = models.IntegerField()
    pam_value = models.FloatField()
    publications = models.ManyToManyField('Publication',
                                          related_name='publication_observations')


    def __str__(self):
        return f"Observation {self.id} of Biosample {self.biosample.id}"

    def save(self, *args, **kwargs):
        # Ensure pam_value is not None before rounding
        if self.pam_value is not None:
            self.pam_value = round(self.pam_value, 3)
        super().save(*args, **kwargs)


class Publication(models.Model):
    title = models.TextField()
    year = models.IntegerField()
    doi = models.CharField(max_length=100)
    observations = models.ManyToManyField(Observation,
                                          related_name='observation_publications')

    def __str__(self):
        return f"Publication {self.id}, {self.doi}"


class UserCart(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                              related_name='carts')
    items = models.ManyToManyField(Colony)

    def __str__(self):
        return f"UserCart of {self.owner.username}, {self.items.count()} items"
