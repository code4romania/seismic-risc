# Added by Francisc Czobor in Django 2.2.10 on 2020-06-22 18:14

from django.db import migrations
from django.contrib.postgres.operations import TrigramExtension


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0001_initial'),
    ]

    operations = [
        TrigramExtension(),
    ]
