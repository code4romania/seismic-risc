# Generated by Django 2.2.10 on 2020-02-29 13:02

import ckeditor.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0002_auto_20200201_1008'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='attachment',
            options={'verbose_name': 'attachment', 'verbose_name_plural': 'attachments'},
        ),
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name': 'category', 'verbose_name_plural': 'categories'},
        ),
        migrations.AlterModelOptions(
            name='page',
            options={'verbose_name': 'page', 'verbose_name_plural': 'pages'},
        ),
        migrations.AlterField(
            model_name='attachment',
            name='name',
            field=models.CharField(help_text='Attachment name', max_length=150, verbose_name='name'),
        ),
        migrations.AlterField(
            model_name='attachment',
            name='page',
            field=models.ForeignKey(blank=True, help_text='Page attachment', on_delete=django.db.models.deletion.CASCADE, to='pages.Page', verbose_name='attachment'),
        ),
        migrations.AlterField(
            model_name='attachment',
            name='upload_date',
            field=models.DateTimeField(auto_now=True, help_text='Attachment upload date', verbose_name='upload date'),
        ),
        migrations.AlterField(
            model_name='attachment',
            name='uploaded_file',
            field=models.FileField(upload_to='uploads/%Y/%m/%d/', verbose_name='uploaded file'),
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=150, unique=True, verbose_name='name'),
        ),
        migrations.AlterField(
            model_name='page',
            name='category',
            field=models.ForeignKey(blank=True, help_text='Page category', null=True, on_delete=django.db.models.deletion.SET_NULL, to='pages.Category', verbose_name='category'),
        ),
        migrations.AlterField(
            model_name='page',
            name='content',
            field=ckeditor.fields.RichTextField(verbose_name='content'),
        ),
        migrations.AlterField(
            model_name='page',
            name='is_published',
            field=models.BooleanField(db_index=True, default=False, help_text='Is this page visible on the website', verbose_name='is published'),
        ),
        migrations.AlterField(
            model_name='page',
            name='publishing_date',
            field=models.DateTimeField(blank=True, help_text='Public page publishing date', null=True, verbose_name='publishing date'),
        ),
        migrations.AlterField(
            model_name='page',
            name='slug',
            field=models.SlugField(blank=True, help_text='Unique URL slug (leave empty to auto-generate)', max_length=150, unique=True, verbose_name='slug'),
        ),
        migrations.AlterField(
            model_name='page',
            name='title',
            field=models.CharField(blank=True, help_text='Page title', max_length=150, verbose_name='title'),
        ),
        migrations.AlterField(
            model_name='page',
            name='updated_on',
            field=models.DateTimeField(auto_now=True, help_text='Last update time', null=True, verbose_name='updated on'),
        ),
    ]
