from django.db import models
from accounts.models import User
from card.models import Card


class Reply(models.Model):
    card = models.ForeignKey(
        Card,
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    contents = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)
