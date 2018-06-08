from rest_framework import serializers

from card.models import Card, Video, Image


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = (
            'user',
            'contents',
            'video_yn',
            'image_yn',
            'deadline',
            'location',
            'lat',
            'lng',
        )


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('card', 'video_name',)


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('card', 'image_name', 'image_path',)
