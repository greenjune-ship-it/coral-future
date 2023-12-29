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


class Sample(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    latitude = models.FloatField()
    longitude = models.FloatField()
    species = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.species} Sample at ({self.latitude}, {self.longitude})"


class Experiment(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    samples = models.ManyToManyField(Sample)
    country = models.CharField(max_length=255)

    def __str__(self):
        return f"Experiment in {self.country} for project {self.project.name}"


class Observation(models.Model):
    sample = models.ForeignKey(Sample, on_delete=models.CASCADE)
    observation_date = models.DateTimeField()
    condition = models.CharField(max_length=255)
    temperature = models.FloatField()
    timepoint = models.IntegerField()
    pam_value = models.FloatField()  # Assuming a single PAM value for simplicity

    def __str__(self):
        return f"Observation for {self.sample.species} at {self.observation_date}"
