# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tododb',
            name='title',
            field=models.CharField(default=datetime.datetime(2019, 5, 23, 14, 5, 57, 428000, tzinfo=utc), max_length=120),
            preserve_default=False,
        ),
    ]
