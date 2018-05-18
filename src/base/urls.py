from django.conf.urls import url

from base import views as base_views


app_name = 'base'
urlpatterns = [
    url(r'',
        base_views.ProtectedDataView.as_view(),
        name='protected_data'),
]
