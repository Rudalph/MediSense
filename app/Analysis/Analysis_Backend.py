from flask import Flask, request, jsonify
import requests
import os
import pdfplumber
import json
import google.generativeai as genai
import re
from langchain_community.graphs import Neo4jGraph
from flask_cors import CORS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
from groq import Groq

app = Flask(__name__)
CORS(app)

PINATA_JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmYzU5NmQyNS1kNTNjLTQ5MGItYjViZC0xZWU4MmMwNDk4YjkiLCJlbWFpbCI6ImdvbnNhbHZlc3J1ZGFscGhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjRmMjc4NzRjYzk1NjRjOWI2ZjliIiwic2NvcGVkS2V5U2VjcmV0IjoiNzMwMzQ5NWMxODY2MmQwMzlmZDY1ZTE5NDU2MzFhNDQzMzNjZWFkOWEwMTY5NjkxY2EwNDFhMGZhMGNkOWMyNiIsImV4cCI6MTc2NTAyOTg0OX0.moW-ebV3O8ZuieNDlbE2a3H4b5v4x5pL_givpV5v8Go"
groq_api_key="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"
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2" )
llm=ChatGroq(groq_api_key=groq_api_key,model_name="llama-3.1-8b-instant", temperature=0.5)

def saviour(structured_data):
    complete_response = ""
    client = Groq(api_key=groq_api_key)
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f'''From below attached medical report\n\n {structured_data}  \n\n
                                    I want you to generate a JSON response with keys as Health Parameters and Values as the Numeric value of those Health Parameters
                                    for example consider below format \n\n
                                    "Triglycerides": {{
                                    "Value": 321.0,
                                    "Remark": "High"
                                    }}
                                    \n\n
                                    You have to strictly follow the format. No changes in the naming convention of the format will be entertained. So please stick to specified fromat.
                                    if the remark is not specified use your own knowledge and let the user know if its High, Low or Normal
                                    '''
            },
        ],
        temperature=1,
        # max_completion_tokens=1024,
        top_p=1,
        stream=True,
        stop=None,
    )
    
    for chunk in completion:
        if chunk.choices[0].delta.content is not None:
            complete_response += chunk.choices[0].delta.content
            
    return complete_response


def extraction_for_graph(file_url):
    
    file_url = file_url
    
    # Step 1: Download the PDF from IPFS
    ipfs_url = file_url
    pdf_response = requests.get(ipfs_url)
    
    # Save the PDF locally
    pdf_file_path = "document.pdf"
    with open(pdf_file_path, 'wb') as file:
        file.write(pdf_response.content)
        print(file_url)
        
    # Step 2: Extract text from the PDF
    data = {}
    with pdfplumber.open(pdf_file_path) as pdf:
        for i, page in enumerate(pdf.pages, start=1):
            # Extract text from each page
            text = page.extract_text()
            # Store text in a structured format
            data[f"Page {i}"] = text
        
    # Step 3: Convert the data into JSON
    structured_data = json.dumps(data, indent=4) 
    
    
    # GOOGLE_API_KEY = 'AIzaSyCDYiMdIg0_EVoAtJPf2teTfC4rEwcq5jE'
    # genai.configure(api_key=GOOGLE_API_KEY)
    # model = genai.GenerativeModel("gemini-1.5-flash")

    # response = model.generate_content(f'''From below attached medical report\n\n {structured_data}  \n\n
    #                                 I want you to generate a JSON response with keys as Health Parameters and Values as the Numeric value of those Health Parameters
    #                                 for example consider below format \n\n
    #                                 "Triglycerides": {{
    #                                 "Value": 321.0,
    #                                 "Remark": "High"
    #                                 }}
    #                                 \n\n
    #                                 You have to strictly follow the format. No changes in the naming convention of the format will be entertained. So please stick to specified fromat.
    #                                 if the remark is not specified use your own knowledge and let the user know if its High, Low or Normal
    #                                 ''')
    # print(response.text)
    # response_text=response.text 
    
    response_text = saviour(structured_data)
    
    # Extract a date from the structured_data
    date_pattern = r'\b\d{2,4}[-/]\d{2}[-/]\d{2,4}\b'  # Matches dates like YYYY-MM-DD, DD-MM-YYYY, etc.
    date_match = re.search(date_pattern, structured_data)
    # Use the first matched date or set to "Unknown" if not found
    extracted_date = date_match.group(0) if date_match else "Unknown"

    # Use regex to extract valid key-value pairs from the response
    pattern = r'"([\w\s\-\/]+)":\s*{\s*"Value":\s*([\d\.]+),\s*"Remark":\s*"([^"]+)"\s*}'
    matches = re.findall(pattern, response_text)

    cleaned_data = {
        "Report Date": extracted_date,  # Add the extracted date at the top
        "Health Parameters": {}         # Initialize the parameters section
    }

    for param, value, remark in matches:
        cleaned_data["Health Parameters"][param] = {
            "Value": float(value),
            "Remark": remark
        }
        
    return cleaned_data





def graph_database(json_data):
    # Extract the report date
    report_date = json_data.get("Report Date")

    # Initialize the base query
    cypher_query = f'CREATE (r:Report {{report_date: "{report_date}"}})\n'

    # Iterate through health parameters to generate nodes and relationships
    for param_name, param_details in json_data["Health Parameters"].items():
        value = param_details["Value"]
        remark = param_details["Remark"]
        
        # Sanitize parameter name for use as a variable name in Cypher
        sanitized_name = re.sub(r'[^a-zA-Z0-9_]', '_', param_name)

        # Add the health parameter node
        cypher_query += f'CREATE ({sanitized_name}:HealthParameter {{name: "{param_name}", value: {value}, remark: "{remark}"}})\n'
        
        # Add the relationship
        cypher_query += f'CREATE (r)-[:HAS_PARAMETER]->({sanitized_name})\n'

    
    NEO4J_URI='neo4j+s://7de6eab3.databases.neo4j.io'
    NEO4J_USERNAME='neo4j'
    NEO4J_PASSWORD='6oXiX1VnIBQrjqz0wTCXpV9pc27pZo-eVKzuCOEHeoA'
    AURA_INSTANCEID='7de6eab3'
    AURA_INSTANCENAME='Instance01'
    
    graph=Neo4jGraph(
    url=NEO4J_URI,
    username=NEO4J_USERNAME,
    password=NEO4J_PASSWORD,
    )
    
    query = f"{cypher_query}"
    graph.query(query)
    




def upload_to_pinata(filepath, jwt_token):
    """
    Uploads a file to IPFS via Pinata.
    """
    url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
    headers = {'Authorization': f'Bearer {jwt_token}'}

    with open(filepath, 'rb') as file:
        response = requests.post(url, files={'file': file}, headers=headers)
        return response.json()


@app.route('/upload_to_pinata', methods=['POST'])
def upload_file():
    """
    Endpoint to handle file upload and pinning to IPFS.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the uploaded file temporarily
    temp_filepath = os.path.join('uploads', file.filename)
    os.makedirs('uploads', exist_ok=True)
    file.save(temp_filepath)

    # Upload to Pinata
    try:
        pinata_response = upload_to_pinata(temp_filepath, PINATA_JWT_TOKEN)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # Clean up the temporary file
        os.remove(temp_filepath)


    graph_json = ''
    print(pinata_response)
    print(f"pinata_response: {pinata_response}, type: {type(pinata_response)}")
    if isinstance(pinata_response, dict) and 'IpfsHash' in pinata_response:
        ipfs_hash = pinata_response['IpfsHash']
        base_url = "https://gateway.pinata.cloud/ipfs/"
        file_url = f"{base_url}{ipfs_hash}"
        print(f"File URL: {file_url}")
        graph_json = extraction_for_graph(file_url)
    else:
        print("Unexpected response format!")
        
    graph_database(graph_json)   
    return jsonify(pinata_response), 200


def fetch_from_pinata(jwt_token):
    url = "https://api.pinata.cloud/data/pinList"
    headers = {'Authorization': f'Bearer {jwt_token}'}
    response = requests.get(url, headers=headers)
    return response.json()

@app.route('/get-ipfs-files', methods=['GET'])
def get_ipfs_files():
    # Replace with your actual Pinata JWT token
    PINATA_JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmYzU5NmQyNS1kNTNjLTQ5MGItYjViZC0xZWU4MmMwNDk4YjkiLCJlbWFpbCI6ImdvbnNhbHZlc3J1ZGFscGhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjRmMjc4NzRjYzk1NjRjOWI2ZjliIiwic2NvcGVkS2V5U2VjcmV0IjoiNzMwMzQ5NWMxODY2MmQwMzlmZDY1ZTE5NDU2MzFhNDQzMzNjZWFkOWEwMTY5NjkxY2EwNDFhMGZhMGNkOWMyNiIsImV4cCI6MTc2NTAyOTg0OX0.moW-ebV3O8ZuieNDlbE2a3H4b5v4x5pL_givpV5v8Go'

    # Fetching data from Pinata API
    data = fetch_from_pinata(PINATA_JWT_TOKEN)

    # Extracting the IPFS pin hashes and file names
   # Extracting the IPFS pin hashes and file names, and filter based on date_unpinned
    files_data = []
    for file in data.get('rows', []):
        # If date_unpinned is None, include it in the response
        if file['date_unpinned'] is None:
            ipfs_hash = file['ipfs_pin_hash']
            file_name = file['metadata']['name']
            file_url = f"https://red-geographical-ox-657.mypinata.cloud/ipfs/{ipfs_hash}"
            files_data.append({'file_name': file_name, 'file_url': file_url})
    
    # Return the extracted data as JSON
    print(files_data)
    return jsonify(files_data)


@app.route('/get_summary_analysis', methods=['POST'])
def extraction():
    data = request.json
    file_url = data.get('file_url')
    
    # Step 1: Download the PDF from IPFS
    ipfs_url = file_url
    pdf_response = requests.get(ipfs_url)
    
    # Save the PDF locally
    pdf_file_path = "document.pdf"
    with open(pdf_file_path, 'wb') as file:
        file.write(pdf_response.content)
        print(file_url)
        
    # Step 2: Extract text from the PDF
    data = {}
    with pdfplumber.open(pdf_file_path) as pdf:
        for i, page in enumerate(pdf.pages, start=1):
            # Extract text from each page
            text = page.extract_text()
            # Store text in a structured format
            data[f"Page {i}"] = text
        
    # Step 3: Convert the data into JSON
    structured_data = json.dumps(data, indent=4) 
    
    
    # GOOGLE_API_KEY = 'AIzaSyCDYiMdIg0_EVoAtJPf2teTfC4rEwcq5jE'
    # genai.configure(api_key=GOOGLE_API_KEY)
    # model = genai.GenerativeModel("gemini-1.5-flash")

    # response = model.generate_content(f'''From below attached medical report\n\n {structured_data}  \n\n
    #                                 I want you to generate a JSON response with keys as Health Parameters and Values as the Numeric value of those Health Parameters
    #                                 for example consider below format \n\n
    #                                 "Triglycerides": {{
    #                                 "Value": 321.0,
    #                                 "Remark": "High"
    #                                 }}
    #                                 \n\n
    #                                 You have to strictly follow the format. No changes in the naming convention of the format will be entertained. So please stick to specified fromat.
    #                                 if the remark is not specified use your own knowledge and let the user know if its High, Low or Normal  
    #                                 ''')
    # print(response.text)
    # response_text=response.text 
    
    response_text = saviour(structured_data)
    
    # Extract a date from the structured_data
    date_pattern = r'\b\d{2,4}[-/]\d{2}[-/]\d{2,4}\b'  # Matches dates like YYYY-MM-DD, DD-MM-YYYY, etc.
    date_match = re.search(date_pattern, structured_data)
    # Use the first matched date or set to "Unknown" if not found
    extracted_date = date_match.group(0) if date_match else "Unknown"

    # Use regex to extract valid key-value pairs from the response
    pattern = r'"([\w\s\-\/]+)":\s*{\s*"Value":\s*([\d\.]+),\s*"Remark":\s*"([^"]+)"\s*}'
    matches = re.findall(pattern, response_text)

    cleaned_data = {
        "Report Date": extracted_date,  # Add the extracted date at the top
        "Health Parameters": {}         # Initialize the parameters section
    }

    for param, value, remark in matches:
        cleaned_data["Health Parameters"][param] = {
            "Value": float(value),
            "Remark": remark
        }  
        
        
    return jsonify(cleaned_data)

if __name__ == '__main__':
    app.run(debug=True)
