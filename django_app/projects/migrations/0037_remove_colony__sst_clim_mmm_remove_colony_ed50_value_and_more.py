# Generated by Django 4.2.9 on 2024-04-14 14:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0036_colony__sst_clim_mmm_colony_thermal_tolerance'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='colony',
            name='_sst_clim_mmm',
        ),
        migrations.RemoveField(
            model_name='colony',
            name='ed50_value',
        ),
        migrations.RemoveField(
            model_name='colony',
            name='thermal_tolerance',
        ),
        migrations.CreateModel(
            name='ThermalTolerance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('abs_thermal_tolerance', models.FloatField()),
                ('rel_thermal_tolerance', models.FloatField()),
                ('_sst_clim_mmm', models.FloatField(blank=True, null=True)),
                ('colony', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='thermal_tolerances', to='projects.colony')),
                ('observations', models.ManyToManyField(related_name='thermal_tolerances', to='projects.observation')),
            ],
        ),
    ]