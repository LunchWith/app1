from django.db import models


class Card(models.Model):
    contents = models.TextField()
    videoid = models.TextField(max_length=15, blank=True)