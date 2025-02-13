POLYMARKET_API = "https://api.polymarket.com/markets"
GNOSIS_PREDICTION_MARKET = "https://gnosis.api.predictions"

def fetch_market_data():
    response = requests.get(POLYMARKET_API)
    markets = response.json()
    return markets['markets'][0]  # Fetch top market

def place_bet(market_id, outcome, amount):
    bet_data = {
        "marketId": market_id,
        "outcome": outcome,
        "amount": amount,
        "user": "0xYourWalletAddress"
    }
    response = requests.post(GNOSIS_PREDICTION_MARKET, json=bet_data)
    return response.json()

market = fetch_market_data()
bet_decision = "YES" if market['probability'] > 0.6 else "NO"
print(place_bet(market['id'], bet_decision, 100))

