from django.db import models
from accounts.models import User


class Card(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    contents = models.TextField()
    videoid = models.TextField(max_length=15, blank=True)
    image_yn = models.IntegerField()
    create_at = models.DateTimeField(auto_now_add=True)


class Image(models.Model):
    card = models.ForeignKey(
        Card,
        on_delete=models.CASCADE,
    )
    imageName = models.CharField(max_length=200)
    imagePath = models.ImageField(upload_to='%Y/%m/%d')
    create_at = models.DateTimeField(auto_now_add=True)
