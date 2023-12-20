import pyodbc
from QueryGenerationEngine import generateQuery

conn_str = (
    "Driver={ODBC Driver 18 for SQL Server};Server=tcp:sihadmin.database.windows.net,1433;Database=sih;Uid=sihadmin;Pwd=sih@12345;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=390;"
)

def execute_sql_query(query):
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()

    cursor.execute(query)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()
    return rows





