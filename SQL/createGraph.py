from makeGraphConnection import Neo4jConnection
from getTables import get_table_names

uri = "neo4j+s://5206912c.databases.neo4j.io"
user = "neo4j"
password = "7-j3f1Gh_NS6k3k-Zzj_YuHtu7odMMlghS9i6gQ8J0o"
database_name = "SQL_Database" 

conn = Neo4jConnection(uri, user, password)

def create_database_graph(database_name):
  
    conn.query(f"CREATE (db:Database {{name: $database_name}})", {"database_name": database_name})

    conn1 = (
        "Driver={ODBC Driver 18 for SQL Server};"
        "Server=tcp:sihadmin.database.windows.net,1433;"
        "Database=sih;"
        f"Uid=sihadmin;"
        f"Pwd=sih@12345;"
        "Encrypt=yes;"
        "TrustServerCertificate=no;"
        "Connection Timeout=990;"
    )
    table_names = get_table_names(conn1)

    for table in table_names:
     
        table_label = table.replace(" ", "_").capitalize()
        conn.query(f"CREATE (t:Table {{name: $table_name}})", {"table_name": table})

        
        conn.query("""
            MATCH (db:Database {name: $database_name}), (t:Table {name: $table_name})
            MERGE (t)-[:IS_IN]->(db)
            """, {"database_name": database_name, "table_name": table})

if __name__ == "__main__":
    create_database_graph(database_name)
    conn.close()
