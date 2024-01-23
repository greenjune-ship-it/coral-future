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
    samples = models.ManyToManyField(Sample)

    def __str__(self):
        return f"Experiment in {self.id} for project {self.project.name}"


class Observation(models.Model):
    sample = models.ForeignKey(Sample, on_delete=models.CASCADE)
    replicate = models.IntegerField()
    condition = models.CharField(max_length=255)
    temperature = models.IntegerField()
    timepoint = models.IntegerField()
    pam_value = models.FloatField()  # Assuming a single PAM value for simplicity

    def __str__(self):
        return f"Observation for {self.sample.species}, replicate {self.replicate}"

    def save(self, *args, **kwargs):
        # Round PAM value to three digits before saving
        self.pam_value = round(self.pam_value, 3)
        super().save(*args, **kwargs)
