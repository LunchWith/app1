# Generated by Django 2.0.3 on 2018-06-08 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('card', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='lat',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='card',
            name='lng',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='card',
            name='location',
            field=models.TextField(default=''),
        ),
    ]
