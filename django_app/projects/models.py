# projects/models.py
from django.db import models
from users.models import CustomUser


class Publication(models.Model):
    """
    Publication includes Observation(s) and belongs to Project(s).
    """
    title = models.TextField()
    year = models.IntegerField()
    doi = models.CharField(max_length=100)
    biosamples = models.ManyToManyField('BioSample',
                                        related_name='publications')

    def __str__(self):
        return f"Publication {self.id}, {self.doi}"


class Project(models.Model):
    """
    Project includes Experiment(s).
    """
    name = models.CharField(max_length=100)
    registration_date = models.DateField()
    description = models.TextField()
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                              related_name='projects')
    publications = models.ManyToManyField(Publication,
                                          related_name='projects')
    biosamples = models.ManyToManyField('BioSample', related_name='projects')

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
    ed50_value = models.FloatField(null=True, blank=True)
    thermal_tolerance = models.FloatField(null=True, blank=True)
    # Internal attribute
    _sst_clim_mmm = models.FloatField(null=True, blank=True)

    def save(self, *args, **kwargs):
        # Ensure ed50_value is not None before rounding
        if self.ed50_value is not None:
            self.ed50_value = round(self.ed50_value, 2)
        if self._sst_clim_mmm is not None:
            self._sst_clim_mmm = round(self._sst_clim_mmm, 2)
        if self.ed50_value is not None and self._sst_clim_mmm is not None:
            self.thermal_tolerance = round(self.ed50_value - self._sst_clim_mmm, 2)
        super().save(*args, **kwargs)

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
    pam_value = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"Observation {self.id} of Biosample {self.biosample.id} {self.biosample.name}"

    def save(self, *args, **kwargs):
        # Ensure pam_value is not None before rounding
        if self.pam_value is not None:
            self.pam_value = round(self.pam_value, 3)
        super().save(*args, **kwargs)


class UserCart(models.Model):
    owner = models.OneToOneField(CustomUser, on_delete=models.CASCADE,
                                 related_name='cart')
    items = models.ManyToManyField('Colony', related_name='carts')

    def __str__(self):
        return f"UserCart of {self.owner.username}, {self.colonies.count()} colonies"
