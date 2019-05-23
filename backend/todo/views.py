from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, Http404
from .models import todoDB
from rest_framework import viewsets
from .serializers import todoSerializer

class todoView(viewsets.ModelViewSet):
    serializer_class = todoSerializer
    queryset = todoDB.objects.all()
    
def index(request):
    queryset = todoDB.objects.all()
    context = {"todo_list": queryset}
    return render(request, 'todo/index.html', context)

def newItem(request):
    # create and save a new todo item
    # redirect to index
    new_todo = todoDB(content = request.POST.get('content'))
    new_todo.save()
    return redirect("index")

def deleteItem(request, todo_id=''):
    try:
        item_to_delete = todoDB.objects.get(id=todo_id)
    except todoDB.DoesNotExist:
        return redirect("index")
    if item_to_delete:
        item_to_delete.delete()
    return redirect("index")

def editItem(request):
    pass

def markItem(request, todo_id=''):
    # try:
    item_to_mark = todoDB.objects.get(id=todo_id)
    # except todoDB.DoesNotExist:
    #     return redirect("index")
    # if item_to_mark:
    item_to_mark.complete = True
    item_to_mark.save()
    return redirect("index")