# neo4j_connection.py
from neo4j import GraphDatabase

class Neo4jConnection:

    def __init__(self, uri, user, password):
        self.__uri = uri
        self.__user = user
        self.__password = password
        self.__driver = None
        try:
            self.__driver = GraphDatabase.driver(self.__uri, auth=(self.__user, self.__password))
        except Exception as e:
            print("Failed to create the driver:", e)
        
    def close(self):
        if self.__driver is not None:
            self.__driver.close()

    def query(self, query, parameters=None, db=None):
        assert self.__driver is not None, "Driver not initialized!"
        session = self.__driver.session(database=db) if db is not None else self.__driver.session() 
        response = None
        try:
            response = list(session.run(query, parameters))
        except Exception as e:
            print("Query failed:", e)
        finally:
            session.close()
        return response
    
    def get_column_names(self, table_name):
        query = f"""
            MATCH (t:Table {{name: '{table_name}'}})-[:PART_OF]->(c:Column)
            RETURN c.name AS columnName
        """
        result = self.query(query)  # Use the query method of the Neo4jConnection class
        return [record["columnName"] for record in result]
