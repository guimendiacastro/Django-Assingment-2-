from http.client import HTTPResponse
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def home(request):
    return render(request, 'index.html', {'name':'Castro'})

def add(request):
    val1 = int(request.GET['num1'])
    val2 = int(request.GET['num2'])
    res = val1 + val2
    return render(request, "result.html", {'result':res})

def add2(request):
    val3 = int(request.POST['num3'])
    val4 = int(request.POST['num4'])
    res = val3 + val4
    return render(request, "result.html", {'result':res})