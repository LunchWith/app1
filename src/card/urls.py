from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import card.views


app_name = 'card'
urlpatterns = [
    url(_(r'^post/$'),
        card.views.CardPostView.as_view(),
        name='cardPost'),
    url(_(r'^list/$'),
        card.views.CardListView.as_view(),
        name='cardList'),
    url(_(r'^list/(?P<id>\d+)/$'),
        card.views.CardListView.as_view(),
        name='cardList'),
    url(_(r'^get/(?P<id>\d+)/$'),
        card.views.CardChangeView.as_view(),
        name='cardChange'),
]
