from django.contrib import admin
from .models import *

class todoAdmin(admin.ModelAdmin):  # add this
      list_display = ('title', 'content', 'dateCreated', 'complete') # 

# Register your models here.
admin.site.register(todoDB)
