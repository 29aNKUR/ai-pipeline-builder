from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import json
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-pipeline-builder.vercel.app",
        "https://ai-pipeline-builder-v9c4.vercel.app",
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    allow_credentials=True,
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

class Pipeline(BaseModel):
    nodes: list = []
    edges: list = []

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag,
    }
