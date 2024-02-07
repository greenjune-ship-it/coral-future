# Generated by Django 4.2.9 on 2024-02-06 15:11

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0015_colony_remove_biosample_collection_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='biosample',
            name='name',
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='colony',
            name='name',
            field=models.CharField(default='2024-02-06', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='experiment',
            name='name',
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='colony',
            name='species',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='observation',
            name='condition',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='project',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='publication',
            name='doi',
            field=models.CharField(max_length=100),
        ),
    ]