# VectorShift Pipeline Builder — Frontend Technical Assessment

A node-based AI pipeline builder built with React Flow, JavaScript, and Python FastAPI. Users drag and connect nodes to build AI pipelines, with a backend that validates pipeline structure and detects directed acyclic graphs (DAGs).

![VectorShift Pipeline Builder](https://img.shields.io/badge/React-18-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow) ![FastAPI](https://img.shields.io/badge/FastAPI-Python-green) ![React Flow](https://img.shields.io/badge/React_Flow-XYFlow-purple)

---

## Features

### Part 1 — Node Abstraction

All nodes are built on a shared `BaseNode` component that handles:

- Consistent dark theme styling with colored header strips
- Input/output handle rendering with labels
- Shared field components (`FieldInput`, `FieldSelect`, `FieldTextarea`, `FieldLabel`)

**9 node types total** — 4 original + 5 new:

| Node      | Color  | Description                                 |
| --------- | ------ | ------------------------------------------- |
| Input     | Purple | Pipeline entry point — text or file         |
| Output    | Pink   | Pipeline exit — text or image               |
| LLM       | Green  | Language model — GPT-4o, Claude, Gemini     |
| Text      | Orange | Text template with dynamic variable handles |
| API Call  | Blue   | HTTP request — GET/POST/PUT/DELETE          |
| Prompt    | Purple | Prompt template builder                     |
| Condition | Yellow | If/else branching logic                     |
| Transform | Teal   | String operations — uppercase, trim, split  |
| Note      | Gray   | Canvas annotation                           |

### Part 2 — Styling

- Dark theme (Catppuccin Mocha palette)
- Colored node headers per type
- Styled ReactFlow controls, minimap, and connection edges
- Hover effects on toolbar drag buttons
- Inter font throughout

### Part 3 — Text Node Logic

- **Auto-resize** — node width and height expand dynamically as the user types
- **Dynamic handles** — typing `{{variableName}}` creates a new input Handle on the left side of the node in real time
- Handles are removed when the variable is deleted from the text
- Variable chips displayed below the textarea

### Part 4 — Backend Integration

- Submit Pipeline button sends all nodes and edges to `/pipelines/parse`
- FastAPI backend calculates `num_nodes`, `num_edges`, and `is_dag`
- DAG detection uses DFS-based cycle detection algorithm
- User-friendly alert displays results:

```
Pipeline Analysis
─────────────────
Nodes:  3
Edges:  2
Is DAG: ✅ Yes
```

---

## Tech Stack

**Frontend**

- React 18 (Create React App)
- JavaScript (ES6+)
- React Flow 11 (reactflow)
- TailwindCSS
- CSS custom properties

**Backend**

- Python 3.11
- FastAPI
- Uvicorn

---

## Getting Started

### Prerequisites

- Node.js 16+
- Python 3.8+

### Frontend

```bash
cd frontend
npm install
npm start
```

Opens at `http://localhost:3000`

### Backend

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

Runs at `http://localhost:8000`

---

## Project Structure

```
├── frontend/
│   └── src/
│       ├── nodes/
│       │   ├── BaseNode.js          # Shared node abstraction
│       │   ├── inputNode.js
│       │   ├── outputNode.js
│       │   ├── llmNode.js
│       │   ├── textNode.js          # Auto-resize + dynamic handles
│       │   ├── apiNode.js           # New
│       │   ├── promptNode.js        # New
│       │   ├── conditionNode.js     # New
│       │   ├── transformNode.js     # New
│       │   ├── noteNode.js          # New
│       │   └── index.js
│       ├── ui.js                    # ReactFlow canvas
│       ├── toolbar.js               # Draggable node buttons
│       ├── draggableNode.js         # Drag-and-drop node component
│       ├── submit.js                # Pipeline submission + alert
│       ├── store.js                 # Zustand state management
│       └── App.js
└── backend/
    └── main.py                      # FastAPI + DAG detection
```

---

## How to Use

1. **Drag nodes** from the toolbar onto the canvas
2. **Connect nodes** by hovering over a node edge to reveal handles, then dragging to another node
3. **Text node** — type `{{variableName}}` to create dynamic input handles
4. **Submit Pipeline** — click the button to analyze the pipeline structure

---

## DAG Detection

The backend uses a DFS-based cycle detection algorithm:

```python
def is_dag(nodes, edges):
    graph = {node['id']: [] for node in nodes}
    for edge in edges:
        graph[edge['source']].append(edge['target'])

    # States: 0=unvisited, 1=visiting, 2=visited
    state = {node_id: 0 for node_id in graph}

    def dfs(node_id):
        state[node_id] = 1
        for neighbor in graph[node_id]:
            if state[neighbor] == 1:  # Back edge = cycle
                return True
            if state[neighbor] == 0 and dfs(neighbor):
                return True
        state[node_id] = 2
        return False

    return not any(dfs(n) for n in graph if state[n] == 0)
```

---

## Assessment Submission

Built by **Ankur Semle** for VectorShift Frontend Technical Assessment.

- GitHub: [github.com/29aNKUR](https://github.com/29aNKUR)
- LinkedIn: [linkedin.com/in/ankursemle](https://linkedin.com/in/ankursemle)
