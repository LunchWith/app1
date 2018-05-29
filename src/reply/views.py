from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from base64 import b64decode
from knox.models import AuthToken
from rest_framework.response import Response
from django.http import JsonResponse

from reply.models import Reply
from card.models import Card
from accounts.models import User
from reply.serializers import ReplySerializer


class ReplyPostView(CreateModelMixin, GenericAPIView):
    serializer_class = ReplySerializer

    def post(self, request):
        token = b64decode(request.META['HTTP_AUTHORIZATION']).decode('UTF-8')
        token_key = token[:8]

        # if authentication is alive
        querySet = AuthToken.objects.values('user_id').get(token_key=token_key)
        if querySet:
            request.data['user'] = querySet['user_id']
            print(request.data)
            self.create(request)

            return Response(status=201)


class ReplyListView(GenericAPIView):
    def get(self, request, card_id):
        querySet = Reply.objects.filter(card_id=card_id) \
            .values() \
            .order_by('-id')[:1] # 최고 금액 순으로 수정 필요

        dataSet = []
        if querySet:
            for query in querySet:
                username = User.objects.values('first_name', 'last_name') \
                    .get(id=query['user_id'])
                query['username'] \
                    = username['first_name'] \
                    + username['last_name']

                dataSet.append(query)

        return JsonResponse({'dataSet': dataSet}, status=201)