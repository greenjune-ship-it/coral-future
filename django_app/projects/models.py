# projects/models.py
from django.db import models
from users.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=255)
    registration_date = models.DateField()
    description = models.TextField()
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                              related_name='projects')

    def __str__(self):
        return f"Project {self.id} called {self.name}, owned by {self.owner}"


class Experiment(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE,
                                related_name='experiments')
    experiment_date = models.DateField()

    def __str__(self):
        return f"Experiment {self.id} from Project {self.project.name}"


class Colony(models.Model):
    species = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    country = models.CharField(max_length=3)

    def __str__(self):
        return f"Colony {self.id} of {self.species} Species from {self.country} ({self.latitude}, {self.longitude})"


class BioSample(models.Model):
    colony = models.ForeignKey(Colony, on_delete=models.CASCADE,
                               related_name='biosamples')

    def __str__(self):
        return f"BioSample {self.id} of Colony {self.colony.id}"


class Observation(models.Model):
    biosample = models.ForeignKey(BioSample, on_delete=models.CASCADE,
                                  related_name='observations')
    condition = models.CharField(max_length=255)
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
    project = models.ForeignKey(Project, on_delete=models.CASCADE,
                                related_name='publications')
    title = models.TextField()
    year = models.IntegerField()
    doi = models.CharField(max_length=255)

    def __str__(self):
        return f"Publication '{self.title}' for project {self.project.name} ({self.year})"


class UserCart(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                              related_name='carts')
    items = models.ManyToManyField(Colony)

    def __str__(self):
        return f"UserCart of {self.owner.username}, {self.items.count()} items"
