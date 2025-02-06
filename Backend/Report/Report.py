from flask import Flask, request, jsonify
from io import BytesIO
import tempfile
from langchain.chains.summarize import load_summarize_chain
from langchain_community.document_loaders import PyPDFLoader
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain.chains import create_retrieval_chain
from langchain.prompts import PromptTemplate
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_huggingface import HuggingFaceEmbeddings
import os
import shutil
import psutil
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


groq_api_key="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"
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2" )
llm=ChatGroq(groq_api_key=groq_api_key,model_name="llama-3.1-8b-instant")

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        try:
            # Read file data into memory
            file_data = file.read()

            # Create a temporary file
            temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
            temp_pdf.write(file_data)

            # Close the file to ensure it's written to disk
            temp_pdf.close()

            # Pass the file path to PyPDFLoader
            loader = PyPDFLoader(temp_pdf.name)
            pages = loader.load_and_split()

            
            llm=ChatGroq(groq_api_key=groq_api_key,model_name="llama-3.1-8b-instant")
            chain = load_summarize_chain(llm, chain_type="stuff")

            result = chain.run(pages)

            return jsonify({'summary': result})
        except Exception as e:
            return jsonify({'error': str(e)})




def load_documents():
    directory="./Data"

    loader = PyPDFDirectoryLoader(directory)   
    documents = loader.load()


    text_splitter = CharacterTextSplitter(
        separator=".",
        chunk_size=300,
        chunk_overlap=200,
        length_function=len,
        is_separator_regex=False,
    )
    print(text_splitter)
    pages = loader.load_and_split(text_splitter)

    vectordb = Chroma.from_documents(pages, embeddings, persist_directory="./chroma_db")


vectorstore_disk = Chroma(
    persist_directory="./chroma_db",
    embedding_function=embeddings
)

retriever = vectorstore_disk.as_retriever(search_kwargs={"k": 5})

template = """
You are a helpful AI assistant.
Answer based on the context provided. 
context: {context}
input: {input}
answer:
"""

prompt = PromptTemplate.from_template(template)
combine_docs_chain = create_stuff_documents_chain(llm, prompt)
retrieval_chain = create_retrieval_chain(retriever, combine_docs_chain)


UPLOAD_FOLDER = os.path.join(os.getcwd(), 'Data')

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Set the maximum file size (if necessary)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB

@app.route('/savefolder', methods=['POST'])
def save_file_to_folder():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if file:
        # Save the file to the desired folder
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        load_documents()
        return jsonify({'message': f'File {file.filename} uploaded successfully!'}), 200



@app.route('/ask', methods=['POST'])
def ask_question():
    
    data = request.json
    question = data['question']
    print(question)
    response = retrieval_chain.invoke({"input": question})
    answer = response["answer"]
    print(answer)
    return jsonify({"answer": answer})

                
if __name__ == '__main__':
    app.run(debug=True, port=5000)
