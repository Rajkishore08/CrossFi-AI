import openai
import requests

openai.api_key = "YOUR_OPENAI_KEY"
STORY_SDK_API = "https://storysdk.com/generate-meme"

def generate_meme_text():
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": "Generate a funny crypto meme caption."}]
    )
    return response["choices"][0]["message"]["content"]

def create_meme():
    meme_text = generate_meme_text()
    payload = {"text": meme_text, "image": "crypto.jpg"}
    response = requests.post(STORY_SDK_API, json=payload)
    return response.json()

print(create_meme())

