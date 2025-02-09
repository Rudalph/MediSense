# from flask import Flask, request, jsonify
# import textwrap
# import google.generativeai as genai
# from flask_cors import CORS
# from langchain_huggingface import HuggingFaceEmbeddings
# import re
# from groq import Groq

# app = Flask(__name__)
# CORS(app)

# # GOOGLE_API_KEY = "AIzaSyDNr-WITS3OgCnROMjVQk0jUblTPsCxVXs"  # Replace with your Google API key
# # genai.configure(api_key=GOOGLE_API_KEY)
# # model = genai.GenerativeModel('gemini-pro')


# groq_api_key="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"
# embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2" )


# def recommendations_on_parameters(question):
#     print("I am here")
#     complete_response = ""
#     client = Groq(api_key=groq_api_key)
#     completion = client.chat.completions.create(
#         model="llama-3.3-70b-versatile",
#         messages=[
#             {
#                 "role": "user",
#                 "content": f"{question}"
#             },
#         ],
#         temperature=1,
#         # max_completion_tokens=1024,
#         top_p=1,
#         stream=True,
#         stop=None,
#     )
    
#     for chunk in completion:
#         if chunk.choices[0].delta.content is not None:
#             complete_response += chunk.choices[0].delta.content
#     print(complete_response)      
#     return complete_response


# @app.route('/genai', methods=['POST'])
# def generate_recommendations():
#     try:
#         # Get the question from the request data
#         question = request.json.get('question')
#         print(question)
        
#         # Generate response based on the question
#         response = recommendations_on_parameters(question)
#         print("Response", response)
        
#         # Format the response
#         # recommendations = textwrap.indent(response.text, '> ')
        
        
#         recommendations = re.sub(r'[>*]+', '', response).strip()
#         print(recommendations)
        
#         return jsonify({'recommendations': recommendations}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 400

# if __name__ == '__main__':
#     app.run(port=5002)


from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

groq_api_key="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"

def recommendations_on_parameters(question):
    try:
        logger.info("Starting recommendations function")
        complete_response = ""
        client = Groq(api_key=groq_api_key)
        
        logger.info("Making API call to Groq")
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",  # Changed model name
            messages=[
                {
                    "role": "user",
                    "content": question
                },
            ],
            temperature=1,
            top_p=1,
            stream=True,
            stop=None,
        )
        
        for chunk in completion:
            if chunk.choices[0].delta.content is not None:
                complete_response += chunk.choices[0].delta.content
        
        logger.info(f"Generated response: {complete_response}")
        return complete_response
    except Exception as e:
        logger.error(f"Error in recommendations_on_parameters: {str(e)}")
        raise  # Re-raise the exception to be caught by the route handler

@app.route('/genai', methods=['POST'])
def generate_recommendations():
    try:
        if not request.is_json:
            return jsonify({'error': 'Content-Type must be application/json'}), 400
            
        question = request.json.get('question')
        if not question:
            return jsonify({'error': 'Question is required'}), 400
            
        logger.info(f"Received question: {question}")
        
        response = recommendations_on_parameters(question)
        if not response:
            return jsonify({'error': 'No response generated'}), 400
            
        logger.info(f"Generated response: {response}")
        
        recommendations = response.strip()
        cleaned_response = (response
            .replace('*', '')
            .replace('+', '')
            .replace('	', '')  # Remove tabs
            .replace('  ', ' ')  # Remove double spaces
            .strip())
        
        lines = cleaned_response.split('\n')
        cleaned_lines = [line.strip() for line in lines if line.strip()]
        final_response = '\n\n'.join(cleaned_lines)
        
        return jsonify({'recommendations': final_response}), 200
        
    except Exception as e:
        logger.error(f"Error in generate_recommendations: {str(e)}", exc_info=True)
        return jsonify({'error': f'An error occurred: {str(e)}'}), 400

@app.before_request
def log_request_info():
    logger.info('Headers: %s', request.headers)
    logger.info('Body: %s', request.get_data())

if __name__ == '__main__':
    logger.info("Starting Flask application")
    app.run(port=5002, debug=True)