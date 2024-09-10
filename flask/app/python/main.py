from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure Gemini API with your API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')  # Get the user's message from the request

    if not user_message:
        return jsonify({'error': 'Message content is required'}), 400

    try:
        # Call Gemini API
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(user_message)

        # Return AI-generated response
        return jsonify({'response': response.text}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
