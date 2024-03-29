# Generated by Django 4.2.9 on 2024-02-09 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0033_biosample_projects'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='biosample',
            name='projects',
        ),
        migrations.AddField(
            model_name='project',
            name='biosamples',
            field=models.ManyToManyField(related_name='projects', to='projects.biosample'),
        ),
    ]
