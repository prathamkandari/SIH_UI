from makeGraphConnection import Neo4jConnection
from getTables import get_table_names


from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
import yaml


from getTables import get_table_names

def get_column_names(conn, table_name):
    columns = []
    try:
        # SQL query to get column names for the specified table
        query = f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table_name}'"
        
        # Use a cursor to execute the query
        with conn.cursor() as cursor:
            cursor.execute(query)

            # Fetch all results using the cursor
            columns = [row[0] for row in cursor.fetchall()]

    except Exception as e:
        print(f"Error fetching column names: {e}")

    return columns



def create_database_graph(database_name, graph_conn, sql_conn, table_vector_map):
    # Create a Database node
    graph_conn.query(f"CREATE (db:Database {{name: $database_name}})", {"database_name": database_name})

    # Iterate through each table in the vector map
    for table in table_vector_map.keys():
        # Retrieve column names for the table
        columns = get_column_names(sql_conn, table)

        # Create a node for the table
        graph_conn.query(f"CREATE (t:Table {{name: $table}})", {"table": table})

        # Create nodes for each column and establish "PART_OF" relationship with the table
        for column in columns:
            graph_conn.query(f"""
                MATCH (t:Table {{name: $table}})
                CREATE (c:Column {{name: $column}})-[:PART_OF]->(t)
                """, {"table": table, "column": column})

        # Optional: Additional logic for setting vector property, if applicable
        vector = table_vector_map.get(table, None)
        if vector is not None:
            graph_conn.query("""
                MATCH (t:Table {name: $table})
                CALL db.create.setNodeVectorProperty(t, 'vector', $vector)
                RETURN t
                """, {"table": table, "vector": vector})

        # Establish a relationship between the table and the database
        graph_conn.query("""
            MATCH (db:Database {name: $database_name}), (t:Table {name: $table})
            MERGE (t)-[:IS_IN]->(db)
            """, {"database_name": database_name, "table": table})









   
        
    #     conn.query(f"CREATE (t:Table {{name: $table_name}})", {"table_name": table})

 

