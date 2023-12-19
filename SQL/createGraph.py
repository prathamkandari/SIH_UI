from makeGraphConnection import Neo4jConnection
from getTables import get_table_names


from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient


import yaml

def create_database_graph(database_name, conn, table_vector_map):
    conn.query(f"CREATE (db:Database {{name: $database_name}})", {"database_name": database_name})

    for table in table_vector_map.keys():
        table_label = table.replace(" ", "_").capitalize()
        
        # Create a table node
        conn.query(f"CREATE (t:Table {{name: $table_name}})", {"table_name": table})

 
        vector = table_vector_map[table]
        conn.query("""
            MATCH (t:Table {name: $table_name})
            CALL db.create.setNodeVectorProperty(t, 'vector', $vector)
            RETURN t
            """, {"table_name": table, "vector": vector})

     
        conn.query("""
            MATCH (db:Database {name: $database_name}), (t:Table {name: $table_name})
            MERGE (t)-[:IS_IN]->(db)
            """, {"database_name": database_name, "table_name": table})


