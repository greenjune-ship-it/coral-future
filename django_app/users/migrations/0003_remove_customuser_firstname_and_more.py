# Generated by Django 4.2.9 on 2024-02-08 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_customuser_firstname_customuser_lastname_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='firstname',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='lastname',
        ),
        migrations.AlterField(
            model_name='customuser',
            name='first_name',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='last_name',
            field=models.CharField(max_length=30),
        ),
    ]
