# Generated by Django 4.2.9 on 2024-02-07 21:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0026_alter_usercart_items'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='publication',
            name='observations',
        ),
    ]
