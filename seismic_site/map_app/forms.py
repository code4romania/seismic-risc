from django import forms
from crispy_forms.helper import FormHelper
from . import models


class BuildingForm(forms.ModelForm):

    class Meta:
        model = models.Building
        exclude = ['id_general', 'status', 'actualizare_pmb', 'editare_admin', 'lat', 'long']

    def __init__(self, *args, **kwargs):
        super(BuildingForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False
        self.helper.error_text_inline = False
