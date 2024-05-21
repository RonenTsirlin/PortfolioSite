from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

@app.route('/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    api_key = os.getenv('API_KEY')
    # Here you would use the api_key to interact with an external service

    print(f'Name: {name}, Email: {email}, Message: {message}')
    print(f'Using API Key: {api_key}')

    return jsonify({"status": "Message received!"})

if __name__ == '__main__':
    app.run(debug=True)
