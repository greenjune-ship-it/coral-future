# Generated by Django 4.2.9 on 2024-02-08 00:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0028_remove_observation_publications_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='biosample',
            old_name='publication',
            new_name='publications',
        ),
        migrations.RenameField(
            model_name='colony',
            old_name='in_carts',
            new_name='carts',
        ),
    ]
