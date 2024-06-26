# Generated by Django 3.2.7 on 2021-11-14 00:12

import buildings.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0012_auto_20211103_1717'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default='Add image file', upload_to='images/', validators=[buildings.models.ImageFile.check_extension])),
                ('status', models.SmallIntegerField(choices=[(0, 'Pending'), (1, 'Accepted'), (-1, 'Rejected')], db_index=True, default=0, verbose_name='status')),
                ('building', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='buildings.building', validators=[buildings.models.ImageFile.check_image_limit])),
            ],
        ),
    ]
