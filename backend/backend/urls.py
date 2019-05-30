from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers
from todo import views

router = routers.DefaultRouter()
router.register(r'todo', views.todoView, 'todo')

urlpatterns = [
    # Examples:
    # url(r'^$', 'todo_project.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls)),

    # this is a simple single template todo app
    url(r'^$', views.index, name='index'),
    url(r'^new/', views.newItem, name='new'),
    url(r'^delete/(?P<todo_id>\d+)/', views.deleteItem, name='delete'),
    url(r'^mark/(?P<todo_id>\d+)/', views.markItem, name='mark'),
    url(r'^edit/(?P<todo_id>\d+)/', views.editItem, name='edit'),
    url(r'^save/', views.saveItem, name='save'),
]
