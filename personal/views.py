# Create your views here.
from django.shortcuts import render
from datetime import datetime

def index(request):
    return render(request, "home.html", {"timestamp": datetime.now().timestamp()})


