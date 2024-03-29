# Generated by Django 3.2.7 on 2021-11-03 15:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0011_auto_20211026_1156'),
    ]

    operations = [
        migrations.RenameModel(old_name='CsvFile', new_name='DataFile'),
        migrations.AlterModelOptions(
            name='datafile',
            options={'verbose_name': 'Data file', 'verbose_name_plural': 'Data files'},
        ),
        migrations.AlterField(
            model_name='datafile',
            name='name',
            field=models.CharField(max_length=255, unique=True, verbose_name='name'),
        ),
    ]
