from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from base64 import b64decode
from knox.models import AuthToken
from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse

from card.models import Card, Image
from accounts.models import User
from card.serializers import CardSerializer, ImageSerializer


class CardPostView(CreateModelMixin, GenericAPIView):
    serializer_class = CardSerializer

    def post(self, request):
        token = b64decode(request.META['HTTP_AUTHORIZATION']).decode('UTF-8')
        token_key = token[:8]

        # if authentication is alive
        querySet = AuthToken.objects.values('user_id').get(token_key=token_key)
        if querySet:
            if len(request.data) == 0:
                request.data = request.POST.copy()

            request.data['user'] = querySet['user_id']
            self.create(request)

            # if image exists
            if request.FILES['imageFile']:
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

            return Response(status=status.HTTP_201_OK)


class CardListView(GenericAPIView):
    def get(self, request):
        dataSet = Card.objects.values() \
            .order_by('-id')[:6]

        for i in range(0, len(dataSet)):
            username = User.objects.values('first_name', 'last_name') \
                .get(id=dataSet[i]['user_id'])
            imagePath = Image.objects.values('imagePath') \
                .get(card_id=dataSet[i]['id'])

            dataSet[i]['username'] \
                = username['first_name'] \
                + username['last_name']
            dataSet[i]['imagePath'] = imagePath

        return JsonResponse({'dataSet': list(dataSet)}, status=201)
