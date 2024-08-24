from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/hello')
def hello_samuel():
    return jsonify(message="Hello Samuel")

if __name__ == '__main__':
    app.run(debug=True, port=5001)
