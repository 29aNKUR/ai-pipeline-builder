from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


def is_dag(nodes: list, edges: list) -> bool:
    node_ids = {node['id'] for node in nodes}
    graph = {node_id: [] for node_id in node_ids}

    for edge in edges:
        src = edge.get('source')
        tgt = edge.get('target')
        if src in graph and tgt in graph:
            graph[src].append(tgt)

    state = {node_id: 0 for node_id in node_ids}

    def dfs(node_id: str) -> bool:
        state[node_id] = 1
        for neighbor in graph[node_id]:
            if state[neighbor] == 1:
                return True
            if state[neighbor] == 0 and dfs(neighbor):
                return True
        state[node_id] = 2
        return False

    for node_id in node_ids:
        if state[node_id] == 0:
            if dfs(node_id):
                return False

    return True


@app.get('/pipelines/parse')
def parse_pipeline(nodes: Optional[str] = None, edges: Optional[str] = None):
    parsed_nodes = []
    parsed_edges = []

    try:
        if nodes:
            parsed_nodes = json.loads(nodes)
        if edges:
            parsed_edges = json.loads(edges)
    except json.JSONDecodeError:
        return {'error': 'Invalid JSON', 'num_nodes': 0, 'num_edges': 0, 'is_dag': False}

    num_nodes = len(parsed_nodes)
    num_edges = len(parsed_edges)
    dag = is_dag(parsed_nodes, parsed_edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag,
    }
