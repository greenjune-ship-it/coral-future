from django.shortcuts import render

# Create your views here.
def login(request):
    form = RegistrationForm()
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            userprofile = User(first_name=form.cleaned_data['first_name'],
                               second_name=form.cleaned_data['second_name']
                                      email=form.cleaned_data['email'])
            userprofile.save()
            return redirect('home')
        else: 
            form = RegistrationForm()
    return render(request,'regiser.html', {'form': form})