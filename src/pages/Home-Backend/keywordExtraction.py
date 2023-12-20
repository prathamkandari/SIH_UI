from flask import Flask, request , jsonify
import pyodbc
from flask_cors import CORS
from QueryGenerationEngine import generateQuery

from vectorizeInput import generate_sentence_vector
from closestNodesInTheGraph import get_closest_nodes_in_the_graph, cosine_similarity
from extractKeyWords import extract_keywords
from runQuery import execute_sql_query
from connectToNeo4J import Neo4jConnection

import numpy as np

uri = "neo4j+s://5206912c.databases.neo4j.io"
user = "neo4j"
password = "7-j3f1Gh_NS6k3k-Zzj_YuHtu7odMMlghS9i6gQ8J0o"
database_name = "neo4j" 

neo4j_conn = Neo4jConnection(uri, user, password)

openai_api_key = "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"

app = Flask(__name__)

CORS(app)

@app.route('/find-table', methods=['POST'])
def find_table():
    input_data = request.get_json()

    input_string = input_data.get('query','')

    if not input_string:
        return jsonify({"error": "No input provided"}), 400
    
    input_keywords = extract_keywords(input_string)
    
    input_vector = generate_sentence_vector(input_keywords)

    closest_nodes = get_closest_nodes_in_the_graph(input_vector, neo4j_conn, database_name)

    query = generateQuery(input_string, closest_nodes, neo4j_conn, openai_api_key)

    rows = execute_sql_query(query)

    print(f'Row: {rows}')


    return jsonify({"closest_nodes": closest_nodes}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5454)



