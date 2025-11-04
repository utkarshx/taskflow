import React from 'react';
import { Handle, Position } from '@xyflow/react';

const AggregatorNode = ({ data }) => (
  <div
    style={{
      background: '#fff5f5',
      border: '2px solid #dc3545',
      borderRadius: '8px',
      width: '100px',
      height: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontWeight: 'bold',
      position: 'relative',
      padding: '5px',
    }}
  >
    <Handle type="target" position={Position.Top} />
    <div style={{ textAlign: 'center', lineHeight: '1.2' }}>
      <div>{data.label}</div>
      <div style={{ fontSize: '8px', fontWeight: 'normal', marginTop: '2px' }}>
        Wait All
      </div>
    </div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export default AggregatorNode;