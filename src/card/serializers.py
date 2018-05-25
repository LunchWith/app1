from rest_framework import serializers

from card.models import Card
from card.models import Image


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('user', 'contents', 'videoid', 'image_yn')


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('card', 'imageName', 'imagePath',)
