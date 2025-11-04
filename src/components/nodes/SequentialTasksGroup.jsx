import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

const SequentialTasksGroup = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      style={{
        background: '#fff8dc',
        border: '2px solid #ff8c00',
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
            border: '1px dashed #ff8c00',
            borderRadius: '4px',
            padding: '20px',
            minHeight: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '11px',
          }}
        >
          <div>↓ Drop tasks here ↓</div>
          <div style={{ fontSize: '10px', marginTop: '5px' }}>
            (Sequential execution)
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default SequentialTasksGroup;