# database_connection.py
import pyodbc

def connect_to_sql_database(conn_str):
    try:
        conn = pyodbc.connect(conn_str)
        return conn
    except pyodbc.Error as e:
        raise e
