import pyodbc
from connectToSQL import connect_to_sql_database

def get_table_names(conn_str):
    try:
        conn = connect_to_sql_database(conn_str)
        cursor = conn.cursor()

        query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'"
        cursor.execute(query)

        for row in cursor:
            yield row.TABLE_NAME

    except pyodbc.Error as e:
        print(f"Database error: {e}")
    except Exception as e:
        print(f"General error: {e}")
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    for table_name in get_table_names():
        print(table_name)
