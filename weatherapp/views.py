from django.shortcuts import render

# Create your views here.
def home(request):

    return render(request, "weatherapp/main.html")

def about(request):

    return render(request, "weatherapp/about.html")