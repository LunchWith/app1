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
        query_set = AuthToken \
            .objects \
            .values('user_id') \
            .get(token_key=token_key)

        if query_set:
            request.data['user'] = query_set['user_id']
            self.create(request)

            return JsonResponse({}, status=201)


class ReplyListView(GenericAPIView):
    def get(self, request, card_id, start_page):
        total_count = 10
        next_bidder_count = 1
        start_page = ((int(start_page)-1) * 10) + 1
        end = start_page + total_count + next_bidder_count

        query_set = Reply.objects.filter(card_id=card_id) \
            .values() \
            .order_by('-bid_price')[start_page:end]

        next_bidder = False
        if len(query_set) == (total_count + next_bidder_count):
            next_bidder = True
            query_set = query_set[0:total_count]

        data_set = []
        if query_set:
            for query in query_set:
                username = User.objects.values('first_name', 'last_name') \
                    .get(id=query['user_id'])
                query['username'] \
                    = username['first_name'] \
                    + username['last_name']

                data_set.append(query)

        return JsonResponse({
            'data_set': data_set,
            'next_bidder': next_bidder,
            'start_page': start_page + 1,
        }, status=201)
