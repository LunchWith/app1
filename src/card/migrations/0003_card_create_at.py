# Generated by Django 2.0.3 on 2018-05-23 03:19

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('card', '0002_card_image_yn'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='create_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
