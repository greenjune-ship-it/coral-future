# Generated by Django 4.2.9 on 2024-02-07 01:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0025_project_owner_alter_project_members'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usercart',
            name='items',
            field=models.ManyToManyField(related_name='carts', to='projects.colony'),
        ),
    ]
