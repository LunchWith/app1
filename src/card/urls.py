from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import card.views


app_name = 'card'
urlpatterns = [
    url(_(r'^post/$'),
        card.views.CardPostView.as_view(),
        name='cardPost'),
]