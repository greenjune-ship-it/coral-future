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
                              related_name='projects')

    def __str__(self):
        return f"Project {self.name}"


class Experiment(models.Model):
    """
    Experiment includes Observation(s).
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE,
                                related_name='experiments')
    name = models.CharField(max_length=100)
    date = models.DateField()

    def __str__(self):
        return f"Experiment {self.name} from {self.project.name}"


class Colony(models.Model):
    """
    Colony includes BioSample(s).
    """
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=100)
    country = models.CharField(max_length=3)
    latitude = models.FloatField()
    longitude = models.FloatField()
    carts = models.ManyToManyField('UserCart', related_name='colonies')

    def __str__(self):
        return f"Colony {self.name} of {self.species} from {self.country} ({self.latitude}, {self.longitude})"


class BioSample(models.Model):
    """
    BioSample includes Observation(s).
    """
    name = models.CharField(max_length=100)
    collection_date = models.DateField()
    colony = models.ForeignKey(Colony, on_delete=models.CASCADE,
                               related_name='biosamples')
    publications = models.ManyToManyField('Publication',
                                         related_name='biosamples')

    def __str__(self):
        return f"BioSample {self.id} {self.name} of Colony {self.colony.id}"


class Observation(models.Model):
    """
    Observation belongs to Experiment.
    """
    experiment = models.ForeignKey(Experiment, on_delete=models.CASCADE,
                                   related_name='observations')
    biosample = models.ForeignKey(BioSample, on_delete=models.CASCADE,
                                  related_name='observations')
    condition = models.CharField(max_length=100)
    temperature = models.IntegerField()
    timepoint = models.IntegerField()
    pam_value = models.FloatField()

    def __str__(self):
        return f"Observation {self.id} of Biosample {self.biosample.id} {self.biosample.name}"

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
    projects = models.ManyToManyField(Project,
                                      related_name='publications')

    def __str__(self):
        return f"Publication {self.id}, {self.doi}"


class UserCart(models.Model):
    owner = models.OneToOneField(CustomUser, on_delete=models.CASCADE,
                                 related_name='cart')

    def __str__(self):
        return f"UserCart of {self.owner.username}, {self.colonies.count()} colonies"
