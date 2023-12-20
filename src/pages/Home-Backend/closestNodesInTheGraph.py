
import numpy as np
def cosine_similarity(vec1, vec2):
  
    dot_product = np.dot(vec1, vec2)
    norm_vec1 = np.linalg.norm(vec1)
    norm_vec2 = np.linalg.norm(vec2)
    return dot_product / (norm_vec1 * norm_vec2)

def get_closest_nodes_in_the_graph(input_vector, neo4j_conn, database_name):
    query = f'''
    MATCH (n:Table)
    RETURN n.name as tableName, n.vector as vector
    '''
    response = neo4j_conn.query(query, db=database_name)
    closest_nodes = []
    for node in response:
        node_vector = node['vector']
        node_name = node['tableName']
        distance = cosine_similarity(input_vector, node_vector)
        closest_nodes.append((node_name, distance))
    closest_nodes.sort(key=lambda x: x[1], reverse=True)
    return closest_nodes[:3]
