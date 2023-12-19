from flask import Flask, request
import pyodbc

from connectToSQL import connect_to_sql_database

from getTables import get_table_names

import  subprocess

app = Flask(__name__)

@app.route('/connect', methods=['POST'])
def connect_to_db():
    data = request.get_json()
    conn_str = data['conn_str']
    try:
       
        conn = connect_to_sql_database(conn_str)

        get_table_names(conn)

        subprocess.run(["python", "createGraph.py"])

        return "Connected to database successfully", 200
    except pyodbc.Error as e:
        return f"Database error: {e}", 500
    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
