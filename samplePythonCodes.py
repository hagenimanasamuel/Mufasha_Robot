# inputs
user = input("user: ")

# Example of using these variables in your script
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content(user, stream=True)
for chunk in response:
    print(chunk.text)
    print("_" * 80)