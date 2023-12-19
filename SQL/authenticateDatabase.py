from flask import Flask, request
import pyodbc
from makeGraphConnection import Neo4jConnection

from connectToSQL import connect_to_sql_database

from getTables import get_table_names

from fetchMetadataOfEachTable import fetch_and_parse_yaml_from_blob

from createGraph import create_database_graph

##NEO4J CONFIG  
uri = "neo4j+s://5206912c.databases.neo4j.io"
user = "neo4j"
password = "7-j3f1Gh_NS6k3k-Zzj_YuHtu7odMMlghS9i6gQ8J0o"
database_name = "SQL_Database" 

neo4j_conn = Neo4jConnection(uri, user, password)


import  subprocess

app = Flask(__name__)

@app.route('/connect', methods=['POST'])
def connect_to_db():
    data = request.get_json()
    conn_str = data['conn_str']
    metadataURI = data['metadataURI']
    conn = None
    try:
    
        conn = connect_to_sql_database(conn_str)
        
        get_table_names(conn)

        yamlMap = fetch_and_parse_yaml_from_blob(metadataURI)

        create_database_graph(database_name,neo4j_conn, yamlMap)

        return "Connected to database successfully", 200
    except pyodbc.Error as e:
        return f"Database error: {e}", 500
    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
