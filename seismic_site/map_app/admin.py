from django.contrib import admin
from .models import CsvFile, Building, CSVFileAdmin

# Register your models here.
admin.site.register(CsvFile, CSVFileAdmin)
admin.site.register(Building)  # ld-l
