from django.core.management.base import BaseCommand
from projects.models import BioSample, Project


class Command(BaseCommand):
    help = 'Link BioSamples between projects and publications'

    def handle(self, *args, **kwargs):
        original_project_name = 'Voolstra et al. 2021'
        related_project_name = 'Evensen et al. 2022'

        try:
            original_project = Project.objects.get(name=original_project_name)
            related_project = Project.objects.get(name=related_project_name)
        except Project.DoesNotExist:
            self.stdout.write(self.style.ERROR(
                f"One of the projects '{original_project_name}' or '{related_project_name}' does not exist."))
            return

        original_publication = original_project.publications.first()
        related_publication = related_project.publications.first()

        biosample_names = [
            "AF1-30", "AF1-33", "AF1-36", "AF1-39",
            "AF2-30", "AF2-33", "AF2-36", "AF2-39",
            "AF3-30", "AF3-33", "AF3-36", "AF3-39",
            "AF4-30", "AF4-33", "AF4-36", "AF4-39",
            "AF5-30", "AF5-33", "AF5-36", "AF5-39",
            "AF6-30", "AF6-33", "AF6-36", "AF6-39",
            "AF7-30", "AF7-33", "AF7-36", "AF7-39",
            "ICN1-30", "ICN1-33", "ICN1-36", "ICN1-39",
            "ICN2-30", "ICN2-33", "ICN2-36", "ICN2-39",
            "ICN3-30", "ICN3-33", "ICN3-36", "ICN3-39",
            "ICN4-30", "ICN4-33", "ICN4-36", "ICN4-39",
            "ICN5-30", "ICN5-33", "ICN5-36", "ICN5-39",
            "ICN6-30", "ICN6-33", "ICN6-36", "ICN6-39",
            "ICN7-30", "ICN7-33", "ICN7-36", "ICN7-39"
        ]

        try:
            biosamples = BioSample.objects.filter(name__in=biosample_names)
        except BioSample.DoesNotExist:
            self.stdout.write(self.style.ERROR(
                "No BioSamples found with the specified names."))
            return

        related_project.biosamples.add(*biosamples)
        self.stdout.write(self.style.SUCCESS(
            f'Linked BioSamples from {original_project_name} to {related_project_name}'))

        related_publication.biosamples.add(*biosamples)
        self.stdout.write(self.style.SUCCESS(
            f'Linked BioSamples from {original_publication} to {related_publication}'))

        # Cross-link publications if necessary
        original_project.publications.add(related_publication)
        related_project.publications.add(original_publication)
        self.stdout.write(self.style.SUCCESS('Cross-linked publications'))
