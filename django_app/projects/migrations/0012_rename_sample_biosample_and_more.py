# Generated by Django 4.2.9 on 2024-01-26 17:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0011_publication'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Sample',
            new_name='BioSample',
        ),
        migrations.RenameField(
            model_name='observation',
            old_name='sample',
            new_name='biosample',
        ),
        migrations.RenameField(
            model_name='observation',
            old_name='replicate',
            new_name='fragment',
        ),
    ]
