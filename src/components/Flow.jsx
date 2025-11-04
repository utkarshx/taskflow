import React, { useRef, useCallback, useState } from 'react';
import {
  Background,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from '../config/nodeTypes';
import { getLabelForType } from '../config/nodeTypes';

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const idCounterRef = useRef(1);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `n${idCounterRef.current}`,
        type,
        position,
        data: { label: getLabelForType(type) },
      };

      idCounterRef.current += 1;
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onNodeClick = useCallback((event, node) => {
    if (node.type === 'task' || node.type === 'todolist' || node.type === 'messagebus' || node.type === 'loop') {
      setSelectedNode(node);
    }
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const updateNodeData = useCallback((field, value) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, [field]: value } }
          : node
      )
    );
    setSelectedNode((prev) => ({
      ...prev,
      data: { ...prev.data, [field]: value },
    }));
  }, [selectedNode, setNodes]);

  return (
    <div
      ref={reactFlowWrapper}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
      >
        {/* Left sidebar toolbar */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 6px',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Task Node */}
          <div
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', 'task');
              event.dataTransfer.effectAllowed = 'move';
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              borderRadius: '6px',
              border: '1px solid #d0d0d0',
              backgroundColor: '#ffffff',
              cursor: 'grab',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            title="Task"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f0f8ff';
              e.target.style.borderColor = '#007bff';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.borderColor = '#d0d0d0';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="9" x2="15" y2="9" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>

          {/* Parallel Tasks Group */}
          <div
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', 'parallel');
              event.dataTransfer.effectAllowed = 'move';
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              borderRadius: '6px',
              border: '1px solid #d0d0d0',
              backgroundColor: '#ffffff',
              cursor: 'grab',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            title="Parallel Tasks Group"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f0fff0';
              e.target.style.borderColor = '#28a745';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.borderColor = '#d0d0d0';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Input from left */}
              <circle cx="4" cy="12" r="2" />
              <line x1="6" y1="12" x2="10" y2="12" />

              {/* Central parallel node */}
              <rect x="10" y="8" width="8" height="8" rx="2" />

              {/* Outputs to right and bottom */}
              <line x1="18" y1="12" x2="22" y2="12" />
              <circle cx="20" cy="12" r="1.5" />

              <line x1="14" y1="16" x2="14" y2="20" />
              <circle cx="14" cy="22" r="1.5" />

              {/* Wait indicator */}
              <circle cx="14" cy="12" r="1" fill="currentColor" />
            </svg>
          </div>

          {/* Sequential Tasks Group */}
          <div
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', 'sequential');
              event.dataTransfer.effectAllowed = 'move';
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              borderRadius: '6px',
              border: '1px solid #d0d0d0',
              backgroundColor: '#ffffff',
              cursor: 'grab',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            title="Sequential Tasks Group"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#fff8dc';
              e.target.style.borderColor = '#ff8c00';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.borderColor = '#d0d0d0';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="6" height="6" rx="1" />
              <rect x="15" y="13" width="6" height="6" rx="1" />
              <line x1="9" y1="8" x2="15" y2="16" />
            </svg>
          </div>

          {/* Independent Tasks Group */}
          <div
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', 'independent');
              event.dataTransfer.effectAllowed = 'move';
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              borderRadius: '6px',
              border: '1px solid #d0d0d0',
              backgroundColor: '#ffffff',
              cursor: 'grab',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            title="Independent Tasks Group"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f0f8ff';
              e.target.style.borderColor = '#6f42c1';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.borderColor = '#d0d0d0';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="6" cy="8" r="3" />
              <circle cx="18" cy="8" r="3" />
              <circle cx="12" cy="16" r="3" />
            </svg>
          </div>

          {/* Aggregator Tasks Group */}
          <div
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', 'merge');
              event.dataTransfer.effectAllowed = 'move';
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              borderRadius: '6px',
              border: '1px solid #d0d0d0',
              backgroundColor: '#ffffff',
              cursor: 'grab',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            title="Aggregator - Waits for all connected tasks"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#fff5f5';
              e.target.style.borderColor = '#dc3545';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.borderColor = '#d0d0d0';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="6" cy="4" r="1.5" />
              <circle cx="12" cy="4" r="1.5" />
              <circle cx="18" cy="4" r="1.5" />
              <line x1="6" y1="5.5" x2="12" y2="10" />
              <line x1="12" y1="5.5" x2="12" y2="10" />
              <line x1="18" y1="5.5" x2="12" y2="10" />
              <circle cx="12" cy="10" r="2" />
              <line x1="12" y1="12" x2="12" y2="18" />
              <circle cx="12" cy="20" r="1.5" />
            </svg>
          </div>

          {/* Todo List */}
          <div
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', 'todolist');
              event.dataTransfer.effectAllowed = 'move';
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              borderRadius: '6px',
              border: '1px solid #d0d0d0',
              backgroundColor: '#ffffff',
              cursor: 'grab',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            title="Todo List - Task management"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#fff3cd';
              e.target.style.borderColor = '#856404';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.borderColor = '#d0d0d0';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="m21 12l-9 9-4-4" />
              <path d="M22 4l-9 9" />
              <path d="M12 4L3 3" />
              <path d="M3 3l6 6" />
              <path d="M12 8V4" />
              <path d="M12 16l3 3" />
              <path d="M3 21l6-6" />
            </svg>
          </div>

          {/* Message Bus */}
          <div
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', 'messagebus');
              event.dataTransfer.effectAllowed = 'move';
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              borderRadius: '6px',
              border: '1px solid #d0d0d0',
              backgroundColor: '#ffffff',
              cursor: 'grab',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            title="Message Bus - Event messaging"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e7f3ff';
              e.target.style.borderColor = '#0066cc';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.borderColor = '#d0d0d0';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <line x1="8" y1="9" x2="16" y2="9" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="16" y2="17" />
              <circle cx="6" cy="9" r="1" />
              <circle cx="6" cy="13" r="1" />
              <circle cx="6" cy="17" r="1" />
              <circle cx="18" cy="9" r="1" />
              <circle cx="18" cy="13" r="1" />
              <circle cx="18" cy="17" r="1" />
            </svg>
          </div>

          {/* Loop */}
          <div
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', 'loop');
              event.dataTransfer.effectAllowed = 'move';
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              borderRadius: '6px',
              border: '1px solid #d0d0d0',
              backgroundColor: '#ffffff',
              cursor: 'grab',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            title="Loop - Iterate over todo list"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f8f9fa';
              e.target.style.borderColor = '#6f42c1';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.borderColor = '#d0d0d0';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Input from top (trigger) */}
              <circle cx="12" cy="4" r="1.5" />
              <line x1="12" y1="5.5" x2="12" y2="8" />

              {/* Input from left (todo list) */}
              <circle cx="4" cy="12" r="1.5" />
              <line x1="5.5" y1="12" x2="8" y2="12" />

              {/* Central loop box */}
              <rect x="8" y="8" width="8" height="8" rx="2" />

              {/* Loop arrows inside box */}
              <path d="M10 12 Q 12 10, 14 12 Q 12 14, 10 12" fill="none" strokeWidth="1.5" />

              {/* Output to right (task to execute) */}
              <line x1="16" y1="12" x2="18.5" y2="12" />
              <circle cx="20" cy="12" r="1.5" />

              {/* Output to bottom (completed) */}
              <line x1="12" y1="16" x2="12" y2="18.5" />
              <circle cx="12" cy="20" r="1.5" />

              {/* Loop iteration indicator */}
              <circle cx="12" cy="10" r="0.5" fill="currentColor" />
            </svg>
          </div>
        </div>
        {/* <Controls /> */}
        {/* <MiniMap /> */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>

      {/* Properties Panel */}
      {selectedNode && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '300px',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            padding: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              borderBottom: '1px solid #eee',
              paddingBottom: '8px',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '16px', color: '#333' }}>
              {selectedNode.type === 'task' ? 'Task Properties' :
               selectedNode.type === 'todolist' ? 'Todo List Properties' :
               selectedNode.type === 'messagebus' ? 'Message Bus Properties' :
               selectedNode.type === 'loop' ? 'Loop Properties' :
               'Node Properties'}
            </h3>
            <button
              onClick={() => setSelectedNode(null)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#666',
                padding: '0',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          </div>

          {/* Task Properties */}
          {selectedNode.type === 'task' && (
            <>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>
                  Task Name
                </label>
                <input
                  type="text"
                  value={selectedNode.data.label || ''}
                  onChange={(e) => updateNodeData('label', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                  placeholder="Enter task name"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>
                  Description
                </label>
                <textarea
                  value={selectedNode.data.description || ''}
                  onChange={(e) => updateNodeData('description', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    minHeight: '60px',
                    resize: 'vertical',
                  }}
                  placeholder="Enter task description"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>
                  Priority
                </label>
                <select
                  value={selectedNode.data.priority || 'medium'}
                  onChange={(e) => updateNodeData('priority', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>
                  Estimated Duration (hours)
                </label>
                <input
                  type="number"
                  value={selectedNode.data.duration || ''}
                  onChange={(e) => updateNodeData('duration', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                  placeholder="Enter duration"
                  min="0"
                  step="0.5"
                />
              </div>
            </>
          )}

          {/* Todo List Properties */}
          {selectedNode.type === 'todolist' && (
            <>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>
                  Todo List Name
                </label>
                <input
                  type="text"
                  value={selectedNode.data.label || ''}
                  onChange={(e) => updateNodeData('label', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                  placeholder="Enter todo list name"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>
                  Todo List ID
                </label>
                <input
                  type="text"
                  value={selectedNode.data.todoListId || ''}
                  onChange={(e) => updateNodeData('todoListId', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                  placeholder="Enter unique todo list ID"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>
                  Total Tasks
                </label>
                <input
                  type="number"
                  value={selectedNode.data.todoCount || ''}
                  onChange={(e) => updateNodeData('todoCount', parseInt(e.target.value) || 0)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                  placeholder="Number of tasks"
                  min="0"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>
                  Completed Tasks
                </label>
                <input
                  type="number"
                  value={selectedNode.data.completedCount || ''}
                  onChange={(e) => updateNodeData('completedCount', parseInt(e.target.value) || 0)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                  placeholder="Number of completed tasks"
                  min="0"
                />
              </div>
            </>
          )}

          {/* Message Bus Properties */}
          {selectedNode.type === 'messagebus' && (
            <>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>
                  Message Bus Name
                </label>
                <input
                  type="text"
                  value={selectedNode.data.label || ''}
                  onChange={(e) => updateNodeData('label', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                  placeholder="Enter message bus name"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>
                  Message Bus ID
                </label>
                <input
                  type="text"
                  value={selectedNode.data.messageBusId || ''}
                  onChange={(e) => updateNodeData('messageBusId', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                  placeholder="Enter unique message bus ID"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>
                  Mode
                </label>
                <select
                  value={selectedNode.data.mode || 'sender'}
                  onChange={(e) => updateNodeData('mode', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  <option value="sender">Sender</option>
                  <option value="receiver">Receiver</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px', fontSize: '12px', color: '#666', padding: '8px', background: '#f8f9fa', borderRadius: '4px' }}>
                <strong>Sender:</strong> Sends messages to all connected nodes<br/>
                <strong>Receiver:</strong> Listens for messages from connected nodes
              </div>
            </>
          )}

          {/* Loop Properties */}
          {selectedNode.type === 'loop' && (
            <>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>
                  Loop Name
                </label>
                <input
                  type="text"
                  value={selectedNode.data.label || ''}
                  onChange={(e) => updateNodeData('label', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                  placeholder="Enter loop name"
                />
              </div>

              <div style={{ marginBottom: '16px', fontSize: '12px', color: '#666', padding: '8px', background: '#f8f9fa', borderRadius: '4px' }}>
                <strong>Simple Loop Configuration:</strong><br/>
                • Connect a Todo List node to the left input<br/>
                • Connect task nodes to the right output<br/>
                • Use the top input to trigger the loop<br/>
                • Loop will execute connected tasks for each todo item<br/>
                • Bottom output triggers when all todos are completed
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>
                  Current Status
                </label>
                <div style={{
                  padding: '8px',
                  background: '#e9ecef',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#495057',
                  textAlign: 'center'
                }}>
                  {selectedNode.data.status === 'running' ? '🔄 Looping...' :
                   selectedNode.data.status === 'completed' ? '✅ Completed' :
                   '⏸️ Ready to start'}
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>
                  Loop Iterations
                </label>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px',
                  background: '#f8f9fa',
                  borderRadius: '4px',
                  fontSize: '12px',
                  border: '1px solid #dee2e6'
                }}>
                  <span>Current: {selectedNode.data.currentIteration || 0}</span>
                  <span>Total: {selectedNode.data.totalIterations || 0}</span>
                </div>
              </div>
            </>
          )}

          <div style={{ fontSize: '11px', color: '#666', marginTop: '16px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
            Node ID: {selectedNode.id} | Type: {selectedNode.type}
          </div>
        </div>
      )}
    </div>
  );
};

export default Flow;