from flask import Flask, request, jsonify
import textwrap
import google.generativeai as genai
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

GOOGLE_API_KEY = "AIzaSyDNr-WITS3OgCnROMjVQk0jUblTPsCxVXs"  # Replace with your Google API key
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

@app.route('/', methods=['POST'])
def generate_recommendations():
    try:
        # Get the question from the request data
        question = request.json.get('question')
        
        # Generate response based on the question
        response = model.generate_content(question)
        
        # Format the response
        # recommendations = textwrap.indent(response.text, '> ')
        
        
        recommendations = re.sub(r'[>*]+', '', response.text).strip()
        print(recommendations)
        
        return jsonify({'recommendations': recommendations}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5002)
