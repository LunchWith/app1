from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin

from card.serializers import CardSerializer



class CardPostView(CreateModelMixin, GenericAPIView):
    serializer_class = CardSerializer

    def post(self, request):
        print('------------------')
        print(request.data)
        print('------------------')

        return self.create(request)
