from django.db import models
from datetime import datetime

# create db for django app called todoDB
class todoDB(models.Model):
    # there are 4 catagories {title, content, dateCreated, complete}
    title = models.CharField(max_length=120)
    content = models.TextField()
    dateCreated = models.DateTimeField(auto_now_add=True, blank=True)
    complete = models.BooleanField(default = False)
    def __str__(self):
        return self.content

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'todo'
        verbose_name_plural = 'todos'
