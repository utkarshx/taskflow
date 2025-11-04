import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

const IndependentTasksGroup = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      style={{
        background: '#f0f8ff',
        border: '2px solid #6f42c1',
        borderRadius: '8px',
        minWidth: '200px',
        minHeight: isExpanded ? '150px' : '60px',
        padding: '10px',
        position: 'relative',
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '12px' }}>
          {data.label}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '0 5px',
          }}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>
      {isExpanded && (
        <div
          style={{
            border: '1px dashed #6f42c1',
            borderRadius: '4px',
            padding: '20px',
            minHeight: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '11px',
          }}
        >
          Drop independent tasks here
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default IndependentTasksGroup;