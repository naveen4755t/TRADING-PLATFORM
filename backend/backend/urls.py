"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from trading_app.views import login_5paisa, get_csrf_token,get_holdings,get_orders
from trading_app.views import login_5paisa as paisa_login  # Rename if needed
# Make sure this import is correct


 # ✅ Correct function name
# Change 'trading_app' to your actual app name



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('trading_app.urls')),
    path("api/5paisa-login/", paisa_login, name="5paisa-login"),
    path("api/csrf/", get_csrf_token, name="csrf_token"),  # ✅ Use the correct function name
    path("holdings/", get_holdings, name="get_holdings"),
    path("api/orders", get_orders, name="orders"),
   

]
