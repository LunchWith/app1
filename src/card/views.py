from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from base64 import b64decode
from knox.models import AuthToken
from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse

from accounts.models import User
from card.models import Card, Video, Image
from reply.models import Reply
from card.serializers import CardSerializer,  VideoSerializer, ImageSerializer

import datetime


class CardPostView(CreateModelMixin, GenericAPIView):
    serializer_class = CardSerializer

    def post(self, request):
        token = b64decode(request.META['HTTP_AUTHORIZATION']).decode('UTF-8')
        token_key = token[:8]

        # if authentication is alive
        query_set = AuthToken \
            .objects \
            .values('user_id') \
            .get(token_key=token_key)
        if query_set:
            request.data['user'] = query_set['user_id']
            request.data['deadline'] = \
                request.data['deadline_date'] + " " + \
                request.data['deadline_time']

            self.create(request)

            # if video exists
            if request.data['video_yn']:
                card = Card.objects.values('id') \
                    .filter(user_id=request.data['user']) \
                    .order_by('-id')[:1]

                video_serializer = VideoSerializer(data={
                    'card': card,
                    'video_name': request.data['video_name']
                })
                if video_serializer.is_valid():
                    video_serializer.save()

            # if image exists
            if request.data['image_yn']:
                card = Card.objects.values('id') \
                    .filter(user_id=request.data['user']) \
                    .order_by('-id')[:1]

                image_serializer = ImageSerializer(data={
                    'card': card,
                    'image_name': request.FILES['image_file'].name,
                    'image_path': request.FILES['image_file'],
                })
                if image_serializer.is_valid():
                    image_serializer.save()

            return JsonResponse({}, status=201)


class CardListView(GenericAPIView):
    def get(self, request, id):
        id = int(id)
        if id == 0:
            query_set_card = Card.objects \
                .values() \
                .order_by('-id')[:6]
        else:
            query_set_card = Card.objects \
                .filter(id__lt=id) \
                .values() \
                .order_by('-id')[:6]

        data_set = []
        if query_set_card:
            for card in query_set_card:

                # card information
                username = User.objects \
                    .values('first_name', 'last_name') \
                    .get(id=card['user_id'])
                card['username'] \
                    = username['first_name'] \
                    + username['last_name']

                # video information
                if card['video_yn'] == 1:
                    video_name = Video.objects \
                        .values('video_name') \
                        .get(card_id=card['id'])
                    card['video_name'] = video_name['video_name']

                # image information
                if card['image_yn'] == 1:
                    image_path = Image.objects \
                        .values('image_path') \
                        .get(card_id=card['id'])
                    card['image_path'] = image_path['image_path']

                # bid information
                top_bidder = Reply.objects\
                    .values('user_id', 'bid_price', 'contents', 'create_at',) \
                    .filter(card_id=card['id']) \
                    .order_by('-bid_price')[:2]

                if top_bidder:
                    top_bidder_username = User.objects \
                        .values('first_name', 'last_name') \
                        .get(id=top_bidder[0]['user_id'])
                    top_bidder[0]['username'] \
                        = top_bidder_username['first_name'] \
                        + top_bidder_username['last_name']

                    if len(top_bidder) == 2:
                        top_bidder[0]['next_bidder'] = 1

                    card['top_bidder'] = top_bidder[0]

                # update dataSet
                data_set.append(card)

        return JsonResponse({'data_set': data_set}, status=201)


class CardChangeView(GenericAPIView):
    def get(self, request, id):
        query_set_card = Card.objects \
            .filter(id=id) \
            .values()

        data_set = []
        if query_set_card:
            for card in query_set_card:

                # card information
                username = User.objects \
                    .values('first_name', 'last_name') \
                    .get(id=card['user_id'])
                card['username'] \
                    = username['first_name'] \
                    + username['last_name']

                # video information
                if card['video_yn'] == 1:
                    video_name = Video.objects \
                        .values('video_name') \
                        .get(card_id=card['id'])
                    card['video_name'] = video_name['video_name']

                # image information
                if card['image_yn'] == 1:
                    image_path = Image.objects \
                        .values('image_path') \
                        .get(card_id=card['id'])
                    card['image_path'] = image_path['image_path']

                # bid information
                top_bidder = Reply.objects\
                    .values('user_id', 'bid_price', 'contents', 'create_at',) \
                    .filter(card_id=card['id']) \
                    .order_by('-bid_price')[:2]

                if top_bidder:
                    top_bidder_username = User.objects \
                        .values('first_name', 'last_name') \
                        .get(id=top_bidder[0]['user_id'])
                    top_bidder[0]['username'] \
                        = top_bidder_username['first_name'] \
                        + top_bidder_username['last_name']

                    if len(top_bidder) == 2:
                        top_bidder[0]['next_bidder'] = 1

                    card['top_bidder'] = top_bidder[0]

                # update dataSet
                data_set.append(card)

        return JsonResponse({'data_set': data_set}, status=201)
