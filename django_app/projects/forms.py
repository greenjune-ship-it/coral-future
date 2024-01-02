from django import forms
from projects.models import Project


class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = [field.name for field in Project._meta.fields if
                  field.name not in ['id', 'created_at', 'updated_at']]

    registration_date = forms.DateField(widget=forms.SelectDateWidget)

    def __init__(self, *args, **kwargs):
        super(ProjectForm, self).__init__(*args, **kwargs)
        # Additional customization if needed
