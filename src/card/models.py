from django.db import models
from accounts.models import User


class Card(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    contents = models.TextField()
    video_yn = models.BooleanField(default=False)
    image_yn = models.BooleanField(default=False)
    deadline = models.DateTimeField()
    create_at = models.DateTimeField(auto_now_add=True)


class Video(models.Model):
    card = models.ForeignKey(
        Card,
        on_delete=models.CASCADE,
    )
    video_name = models.CharField(max_length=15, blank=True)
    create_at = models.DateTimeField(auto_now_add=True)


class Image(models.Model):
    card = models.ForeignKey(
        Card,
        on_delete=models.CASCADE,
    )
    image_name = models.CharField(max_length=200)
    image_path = models.ImageField(upload_to='%Y/%m/%d', max_length=100)
    create_at = models.DateTimeField(auto_now_add=True)
