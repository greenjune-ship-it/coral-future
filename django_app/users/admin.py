from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from users.forms import CustomUserCreationForm, CustomUserChangeForm
from users.models import CustomUser
from projects.models import UserCart


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser


class UserCartInline(admin.TabularInline):
    model = UserCart


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(UserCart)
