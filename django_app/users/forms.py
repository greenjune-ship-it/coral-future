from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from users.models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = (UserCreationForm.Meta.fields +
                  ('first_name', 'last_name', 'email'))


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = UserChangeForm.Meta.fields
