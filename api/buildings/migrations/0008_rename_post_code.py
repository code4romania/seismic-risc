# Added by Tudor Amariei in Django 2.2.18 on 2021-02-25 08:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0007_auto_20210312_1625'),
    ]

    operations = [
        migrations.RenameField(
            model_name='building',
            old_name='post_code',
            new_name='street_number'
        ),
        migrations.AlterField(
            model_name='building',
            name='street_number',
            field=models.CharField(max_length=100, verbose_name='street number'),
        ),
    ]
