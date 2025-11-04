import React from 'react';
import { Handle, Position } from '@xyflow/react';

const TaskNode = ({ data, selected }) => (
  <div
    style={{
      padding: '10px 15px',
      background: '#fff',
      border: selected ? '2px solid #007bff' : '1px solid #ddd',
      borderRadius: '5px',
      minWidth: '100px',
      textAlign: 'center',
      fontSize: '12px',
      cursor: 'pointer',
      boxShadow: selected ? '0 4px 8px rgba(0,123,255,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease',
    }}
  >
    <Handle type="target" position={Position.Top} />
    <div>
      <div style={{ fontWeight: 'bold' }}>{data.label}</div>
      {data.description && (
        <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
          {data.description.length > 30 ? `${data.description.substring(0, 30)}...` : data.description}
        </div>
      )}
      {data.priority && (
        <div style={{
          fontSize: '10px',
          marginTop: '4px',
          padding: '2px 6px',
          borderRadius: '10px',
          backgroundColor: data.priority === 'high' ? '#dc3545' : data.priority === 'low' ? '#28a745' : '#ffc107',
          color: 'white',
          display: 'inline-block'
        }}>
          {data.priority.toUpperCase()}
        </div>
      )}
    </div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export default TaskNode;