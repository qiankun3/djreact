from django.shortcuts import render, redirect, render_to_response
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.template import RequestContext
from .models import todoDB
from rest_framework import viewsets
from .serializers import todoSerializer

# create serializer class for django app
class todoView(viewsets.ModelViewSet):
    serializer_class = todoSerializer
    queryset = todoDB.objects.all()




# for test use
def index(request):
    queryset = todoDB.objects.all()
    context = {"todo_list": queryset}
    return render(request, 'todo/index.html', context)


def newItem(request):
    # create and save a new todo item
    # redirect to index
    newTitle = request.POST.get('content')
    if newTitle:
        new_todo = todoDB(title=newTitle, content="Description: ")
        new_todo.save()
    else:
        return redirect("index")
    return redirect("index")


def deleteItem(request, todo_id=''):
    try:
        item_to_delete = todoDB.objects.get(id=todo_id)
    except todoDB.DoesNotExist:
        return redirect("index")
    if item_to_delete:
        item_to_delete.delete()
    return redirect("index")


def editItem(request, todo_id=''):
    return redirect("index")
    # try:
    #     item_to_edit = todoDB.objects.get(id=todo_id)
    # except todoDB.DoesNotExist:
    #     return redirect("index")
    # if item_to_edit:
    #     return render_to_response('index.html', item_to_edit)


def markItem(request, todo_id=''):
    # try:
    item_to_mark = todoDB.objects.get(id=todo_id)
    # except todoDB.DoesNotExist:
    #     return redirect("index")
    # if item_to_mark:
    item_to_mark.complete = True
    item_to_mark.save()
    return redirect("index")


def saveItem(request):
    return redirect("index")