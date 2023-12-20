rom flask import Flask, request
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

