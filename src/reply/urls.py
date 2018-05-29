from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import reply.views


app_name = 'reply'
urlpatterns = [
    url(_(r'^post/$'),
        reply.views.ReplyPostView.as_view(),
        name='replyPost'),
    url(_(r'^list/(?P<card_id>\d+)/$'),
        reply.views.ReplyListView.as_view(),
        name='replyList'),
]
