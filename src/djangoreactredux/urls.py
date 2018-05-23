from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.views.static import serve
from django.views.decorators.cache import cache_page

from base import views as base_views


urlpatterns = [
    url(r'^api/v1/accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^api/v1/getdata/', include('base.urls', namespace='base')),
    url(r'^api/v1/card/', include('card.urls', namespace='card')),

    # catch image url
    url(r'^%s/(?P<path>.*)$' % settings.MEDIA_URL.replace("/", ""),
        serve,
        {'document_root': settings.MEDIA_ROOT}),

    # catch all others because of how history is handled by react router
    # - cache this page because it will never change
    url(r'',
        cache_page(
            settings.PAGE_CACHE_SECONDS
        )(base_views.IndexView.as_view()),
        name='index'),
]
