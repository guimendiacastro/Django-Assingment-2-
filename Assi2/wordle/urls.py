from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name= 'home'),
    path('game', views.game, name='game'),
    path('add', views.add, name = 'add'),
    path('add2', views.add2, name = 'add2'),
    path('out', views.out, name = 'out'),
]