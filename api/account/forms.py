from django import forms


class LoginForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        self.fields["username"].label = "Utilizator"
        self.fields["password"].label = "Parolă"

    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)
