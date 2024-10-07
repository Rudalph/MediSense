from flask import Flask, request, jsonify
import google.generativeai as genai
import re
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

GOOGLE_API_KEY = "AIzaSyCm-ow0oiLoVb2BrnGzrj6klQtYpjIsfk0"  # Replace with your actual API key
genai.configure(api_key=GOOGLE_API_KEY)

@app.route('/genai-image', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']

    # Save the file temporarily
    file_path = os.path.join(os.getcwd(), file.filename)
    file.save(file_path)

    # Process the image with Google Generative AI
    try:
        myfile = genai.upload_file(file_path)
        model = genai.GenerativeModel("gemini-1.5-flash-8b")
        result = model.generate_content(
            [myfile, "\n\n", """In reponse I dont want any text.
             I just want a JSON response in following template
             {
                 "medecine_1":"Medecine_name",
                 "medecine_2":"Medecine_name"...
             }"""]
        )

        response_text = result.text

        # Use regex to extract the first medicine
        match = re.search(r'"medecine_1"\s*:\s*"([^"]+)"', response_text)

        if match:
            medicine_1 = match.group(1)
        else:
            medicine_1 = "No medicine name found"

        # Return the result as a JSON response
        return jsonify({"medicine_1": medicine_1})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Clean up the temporary file
        os.remove(file_path)

if __name__ == '__main__':
    app.run(debug=True, port=5004)
