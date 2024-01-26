# projects/models.py
from django.db import models
from users.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=255)
    registration_date = models.DateField()
    description = models.TextField()
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class BioSample(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    country = models.CharField(max_length=3)
    species = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    collection_date = models.DateField()

    def __str__(self):
        return f"{self.project.id}_{self.country}_{self.species}_{self.collection_date}_{self.latitude}_{self.longitude}"


class Experiment(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    experiment_date = models.DateField()
    biosamples = models.ManyToManyField(BioSample)

    def __str__(self):
        return f"Experiment in {self.id} for project {self.project.name}"


class Observation(models.Model):
    biosample = models.ForeignKey(BioSample, on_delete=models.CASCADE)
    fragment = models.IntegerField()
    condition = models.CharField(max_length=255)
    temperature = models.IntegerField()
    timepoint = models.IntegerField()
    pam_value = models.FloatField()  # Assuming a single PAM value for simplicity

    def __str__(self):
        return f"Observation for {self.biosample.species}, fragment {self.fragment}"

    def save(self, *args, **kwargs):
        # Round PAM value to three digits before saving
        self.pam_value = round(self.pam_value, 3)
        super().save(*args, **kwargs)

class Publication(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.TextField()
    year = models.IntegerField()
    doi = models.CharField(max_length=255)

    def __str__(self):
        return f"Publication '{self.title}' for project {self.project.name} ({self.year})"