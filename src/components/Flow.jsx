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
    if (node.type === 'task') {
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
              <rect x="3" y="8" width="6" height="8" rx="1" />
              <rect x="15" y="8" width="6" height="8" rx="1" />
              <line x1="9" y1="12" x2="15" y2="12" />
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
              Task Properties
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

          <div style={{ fontSize: '11px', color: '#666', marginTop: '16px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
            Node ID: {selectedNode.id}
          </div>
        </div>
      )}
    </div>
  );
};

export default Flow;