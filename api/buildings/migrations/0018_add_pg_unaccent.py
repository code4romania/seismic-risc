# Added by Tudor Amariei in Django 3.2.11 on 2022-01-29 10:00

from django.db import migrations
from django.contrib.postgres.operations import UnaccentExtension


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0017_auto_20220112_1135'),
    ]

    operations = [
        UnaccentExtension(),
        migrations.RunSQL(
            """
            CREATE TEXT SEARCH CONFIGURATION romanian_unaccent( COPY = romanian );
            ALTER TEXT SEARCH CONFIGURATION romanian_unaccent
            ALTER MAPPING FOR hword, hword_part, word
            WITH unaccent, romanian_stem;
            """
        ),
    ]
