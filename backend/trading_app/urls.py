from django.urls import path
from .views import test_api
from .views import test_api, your_view_function 
from .views import get_holdings, login_5paisa,place_trade

urlpatterns = [
    path('test/', test_api),
    path("your-endpoint/", your_view_function, name="your_endpoint"),
    path("holdings/", get_holdings, name="get_holdings"),  # ✅ Holdings API
    path("login/", login_5paisa, name="login_5paisa"),
    path("trade/", place_trade, name="place_trade"),
   

    
]

