from django.http import JsonResponse


def test_api(request):
    return JsonResponse({"message": "API is working!"})

def your_view_function(request):
    return JsonResponse({"message": "Your endpoint is working!"})



# trading_app/views.py
from django.http import JsonResponse
from rest_framework.decorators import api_view
from py5paisa import FivePaisaClient

# Replace these with your actual credentials
CREDENTIALS = {
    "APP_NAME": "5P52952496",
    "APP_SOURCE": "25473",
    "USER_ID": "ro2WGFnkOxr",
    "PASSWORD": "eAvDhLL1j6y",
    "USER_KEY": "dvkR8x1lsSFRzvIXCSsyPqKBGt5xzSVR",
    "ENCRYPTION_KEY": "6AIQOWLCqhKIquFwy2xTetpri2NYV20V"
}

def login_5paisa(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            client_code = data.get("client_code")
            pin = data.get("pin")
            totp = data.get("totp")

            print(f"Logging in with: Client Code: {client_code}, PIN: {pin}, TOTP: {totp}")

            # Call 5Paisa API
            response = login_to_5paisa(client_code, pin, totp)

            print("Response from 5Paisa:", response)  # Debugging print

            if response.get("status") == "success":
                return JsonResponse({"message": "Login successful!", "token": response.get("token")})
            else:
                return JsonResponse({"error": "5Paisa login failed. Check credentials."}, status=400)

        except Exception as e:
            print("Login error:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@csrf_exempt
def login_5paisa(request):
    if request.method == "POST":
        return JsonResponse({"message": "Login successful!"})
    return JsonResponse({"error": "Invalid request"}, status=400)

from django.http import JsonResponse
from django.middleware.csrf import get_token

def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_holdings(request):
    if request.method == "GET":
        holdings_data = {
            "holdings": [
                {"symbol": "RELIANCE", "quantity": 10, "avg_price": 2500.50},
                {"symbol": "TCS", "quantity": 5, "avg_price": 3600.75},
            ]
        }
        return JsonResponse(holdings_data)
    else:
        return JsonResponse({"error": "Invalid request"}, status=400)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def place_trade(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            symbol = data.get("symbol")
            quantity = data.get("quantity")
            order_type = data.get("order_type")

            if not symbol or not quantity or not order_type:
                return JsonResponse({"success": False, "error": "Missing trade details"}, status=400)

            # Simulating a trade placement (Replace this with actual API call to 5Paisa)
            trade_result = {
                "success": True,
                "message": f"{order_type} order for {quantity} shares of {symbol} placed successfully!"
            }

            return JsonResponse(trade_result)

        except json.JSONDecodeError:
            return JsonResponse({"success": False, "error": "Invalid JSON"}, status=400)

    return JsonResponse({"success": False, "error": "Invalid request method"}, status=405)



def get_orders(request):
    orders = [
        {"symbol": "AAPL", "price": 145, "quantity": 10, "type": "BUY"},
        {"symbol": "GOOGL", "price": 2900, "quantity": 5, "type": "SELL"}
    ]
    return JsonResponse({"orders": orders})