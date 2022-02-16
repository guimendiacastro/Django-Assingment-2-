from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name= 'home'),
    path('add', views.add, name = 'add'),
    path('add2', views.add2, name = 'add2')
]