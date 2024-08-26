import os
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from langchain_community.graphs import Neo4jGraph
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import GraphCypherQAChain
from flask_cors import CORS


gemini_api = "AIzaSyC5agUKvQR7gBuutdV0FSo0tpz2MRn8uL4"
hf_api = "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"


neo4j_url = "neo4j+s://babf3722.databases.neo4j.io"
neo4j_user = "neo4j"
neo4j_password ="6qkA7VWxWKgfO5tJ7Lm2yKew2hVd3X7GBp_5F-93aNI"

# Initialize Neo4jGraph instance
graph = Neo4jGraph(neo4j_url, neo4j_user, neo4j_password)
graph.refresh_schema()

# Initialize language model
llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=gemini_api, temperature=0)
chain = GraphCypherQAChain.from_llm(graph=graph, llm=llm, verbose=True)

# Create Flask application
app = Flask(__name__)
CORS(app)

# Route to handle fetching brand details based on generic name
@app.route('/brand', methods=['POST'])
def get_brand_details():
    # Get input value from frontend
    input_value = request.json.get('question')
    print(input_value)

    # Construct Cypher query to get generic name for the given brand name
    
    cypher_query = "MATCH (b:Brand {name: $input_value})-[:HAS_GENERIC_NAME]->(g:GenericName) RETURN g.name AS genericName"
    result = graph.query(cypher_query, params={"input_value": input_value})
    print(result)
    if result:
        generic_name = result[0]['genericName']
        print(generic_name)
        
        # Construct Cypher query to get brand details based on generic name
        cypher_query_details = """
        MATCH (b:Brand)-[:HAS_GENERIC_NAME]->(g:GenericName {name: $generic_name})
        OPTIONAL MATCH (b)-[:PRICED_AT]->(p:Price)
        OPTIONAL MATCH (b)-[:HAS_STRENGTH]->(s:Strength)
        OPTIONAL MATCH (b)-[:PACKAGED_AS]->(pkg:Package)
        OPTIONAL MATCH (b)-[:MANUFACTURED_BY]->(c:Company)
        RETURN b.name AS brandName, 
        g.name AS genericName, 
        p.amount AS price, 
        s.value AS strength, 
        pkg.type AS packageName, 
        c.name AS companyName
        """
        
        result_details = graph.query(cypher_query_details,params={"generic_name": generic_name})
        print(result_details)
        
        return jsonify(result_details)
    else:
        return jsonify({'error': 'Brand not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5001)
