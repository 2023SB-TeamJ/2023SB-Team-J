from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .models import User


class UserCreationForm(forms.ModelForm): #
    email = forms.EmailField(required=True)
    password = forms.CharField(label='Password', widget=forms.PasswordInput)
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    #패스워드 두개 동일한지 검증은 프론트에서
    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user

class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model =User
        fields = ('email',)

    def clean_password(self):
        return self.initial["password"]


# 로그인 인증 폼
class AccountAuthForm(forms.ModelForm):
    password = forms.CharField(label='Password', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email', 'password')

    def clean(self):
        if self.is_valid():
            email = self.cleaned_data['email']
            password = self.cleaned_data['password']
            if not authenticate(email=email, password=password):
                raise forms.ValidationError("Invalid login")

