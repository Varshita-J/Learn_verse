from django.contrib import admin
#Importing User & Profile Model
from userauths.models import User, Profile

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name', 'date']

# Register your models here.
admin.site.register(User)
admin.site.register(Profile, ProfileAdmin)
#admin.site.register(Profile)

