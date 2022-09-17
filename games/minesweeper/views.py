from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def say_hello(request):
    return render(request, 'hello.html', { 'name': 'jack'})

def minesweeper(request):
    return render(request, 'minesweeper.html', {'name': 'jack'})
