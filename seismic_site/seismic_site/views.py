from django.shortcuts import render
from map_app import forms


def index(request):
    return render(request, "index.html")


def add_building(request):
    building_form = forms.BuildingForm(request.POST or None)

    if building_form.is_valid():
        building_form.save()
        form_is_valid = True
    else:
        form_is_valid = False

    return_dict = {
        'form_is_valid': form_is_valid,
        'building_form': building_form,
    }

    return render(request, 'add_building.html', return_dict)
