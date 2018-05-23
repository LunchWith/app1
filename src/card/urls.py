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
    
    # sample
    url(_(r'^postSample/$'),
        card.views.CardPostSampleView.as_view(),
        name='cardPostSample'),
]
