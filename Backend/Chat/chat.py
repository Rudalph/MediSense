from flask import Flask, request, jsonify
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import PyPDFDirectoryLoader
from flask_cors import CORS
import os
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

model = genai.GenerativeModel('gemini-1.5-pro-latest')

os.environ["GOOGLE_API_KEY"] = "AIzaSyDNr-WITS3OgCnROMjVQk0jUblTPsCxVXs"

llm = ChatGoogleGenerativeAI(model="models/gemini-1.5-pro-latest", temperature=0.5)
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

# directory="./Data"

# loader = PyPDFDirectoryLoader(directory)   
# documents = loader.load()


# text_splitter = CharacterTextSplitter(
#     separator=".",
#     chunk_size=4000,
#     chunk_overlap=3000,
#     length_function=len,
#     is_separator_regex=False,
# )
# print(text_splitter)
# pages = loader.load_and_split(text_splitter)

# vectordb = Chroma.from_documents(pages, embeddings, persist_directory="./chroma_db")

vectorstore_disk = Chroma(
    persist_directory="./chroma_db",
    embedding_function=embeddings
)

retriever = vectorstore_disk.as_retriever(search_kwargs={"k": 5})

template = """
You are a helpful AI assistant.
Answer only based on the context provided. 
If the question provided to you is out of context just say I don't know.
context: {context}
input: {input}
answer:
"""

prompt = PromptTemplate.from_template(template)
combine_docs_chain = create_stuff_documents_chain(llm, prompt)
retrieval_chain = create_retrieval_chain(retriever, combine_docs_chain)


@app.route('/bot', methods=['POST'])
def ask_question():
    data = request.json
    question = data['question']
    print(question)
    response = retrieval_chain.invoke({"input": question})
    answer1 = response["answer"]
    print("answer1: ",answer1)
    
    generated_response = model.generate_content(f"""
The question provided is: '{question}'.
The generated answer is: '{answer1}'.

If this answer is relevant and correctly addresses the question, return only '1'.
If the answer is incorrect, incomplete, or irrelevant, generate a new and correct answer that directly answers the question, but only if the question is related to healthcare.

If the question is not related to healthcare, return: 'I don't know the answer'.
Do not include any additional text beyond what is requested.
""" 
)

    print(generated_response)
    answer2 = generated_response._result.candidates[0].content.parts[0].text
    print("answer2: ",answer2)
    
    final_answer=""
    
    if answer2.strip()=="1":
        final_answer=answer1
    else:
        final_answer=answer2
    
    print(final_answer)
    return jsonify({"answer": final_answer})


if __name__ == '__main__':
    app.run(debug=True,port=5003)
