import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load the environment variables from .env file
load_dotenv()

# Access the environment variables
# gemini_api_key = os.getenv('GEMINI_API_KEY')
# openai_api_key = os.getenv('OPENAI_API_KEY')

# assign the dotenv api to gemini
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# inputs
user = input("user: ")

# Example of using these variables in your script
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content(user)
print(response.text)
