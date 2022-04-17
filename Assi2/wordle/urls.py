from django.urls import path

from . import views
from .views import *

urlpatterns = [
    path('', views.home, name= 'home'),
    path('game',  AjaxHandlerView2.as_view()),
    path('add', views.add, name = 'add'),
    path('add2', views.add2, name = 'add2'),
    path('out', AjaxHandlerView1.as_view()),
    path('search', views.word, name = 'word')
]