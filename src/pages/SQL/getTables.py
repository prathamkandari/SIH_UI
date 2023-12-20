import pyodbc
from connectToSQL import connect_to_sql_database

def get_table_names(conn_str):
    conn = None
    cursor = None
    try:
        conn = connect_to_sql_database(conn_str)
        cursor = conn.cursor()

        query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'"
        cursor.execute(query)

        for row in cursor:
            yield row[0]  # Assuming row.TABLE_NAME should be row[0]

    except pyodbc.Error as e:
        print(f"Database error: {e}")
    except Exception as e:
        print(f"General error: {e}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
