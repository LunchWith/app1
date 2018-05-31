from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from base64 import b64decode
from knox.models import AuthToken
from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse

from accounts.models import User
from card.models import Card, Image
from reply.models import Reply
from card.serializers import CardSerializer, ImageSerializer


class CardPostView(CreateModelMixin, GenericAPIView):
    serializer_class = CardSerializer

    def post(self, request):
        token = b64decode(request.META['HTTP_AUTHORIZATION']).decode('UTF-8')
        token_key = token[:8]

        # if authentication is alive
        querySet = AuthToken.objects.values('user_id').get(token_key=token_key)
        if querySet:
            request.data['user'] = querySet['user_id']
            print(request.data)
            self.create(request)

            # if image exists
            if len(request.FILES) != 0:
                card = Card.objects.values('id') \
                    .filter(user_id=request.data['user']) \
                    .order_by('-id')[:1]

                imageSerializer = ImageSerializer(data={
                    'card': card,
                    'imageName': request.FILES['imageFile'].name, 
                    'imagePath': request.FILES['imageFile'],
                })
                if imageSerializer.is_valid():
                    imageSerializer.save()

            return Response(status=201)


class CardListView(GenericAPIView):
    def get(self, request, id):
        id = int(id)
        if id == 0:
            querySetCard = Card.objects \
                .values() \
                .order_by('-id')[:6]
        else:
            querySetCard = Card.objects \
                .filter(id__lt=id) \
                .values() \
                .order_by('-id')[:6]

        dataSet = []
        if querySetCard:
            for card in querySetCard:
                # card information
                username = User.objects \
                    .values('first_name', 'last_name') \
                    .get(id=card['user_id'])
                card['username'] \
                    = username['first_name'] \
                    + username['last_name']
                
                # image information
                if card['image_yn'] == 1:
                    imagePath = Image.objects \
                        .values('imagePath') \
                        .get(card_id=card['id'])
                    card['imagePath'] = imagePath['imagePath']

                # bid information
                topBidder = Reply.objects\
                    .values('user_id', 'bid_price', 'contents', 'create_at',) \
                    .filter(card_id=card['id']) \
                    .order_by('-bid_price')[:2]

                if topBidder:
                    topBidderUsername = User.objects \
                        .values('first_name', 'last_name') \
                        .get(id=topBidder[0]['user_id'])
                    topBidder[0]['username'] \
                        = topBidderUsername['first_name'] \
                        + topBidderUsername['last_name']

                    if len(topBidder) == 2:
                        topBidder[0]['nextBidder'] = 1

                    card['topBidder'] = topBidder[0]

                # update dataSet
                dataSet.append(card)

            return JsonResponse({'dataSet': dataSet}, status=201)
