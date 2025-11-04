import React from 'react';
import { Handle, Position } from '@xyflow/react';

const ParallelTasksGroup = ({ data }) => (
  <div
    style={{
      background: '#f0fff0',
      border: '2px solid #28a745',
      borderRadius: '8px',
      width: '140px',
      height: '80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      fontWeight: 'bold',
      position: 'relative',
      padding: '8px',
      cursor: 'pointer',
    }}
  >
    {/* Input handle for parallel tasks */}
    <Handle type="target" position={Position.Left} />

    {/* Main content */}
    <div style={{ textAlign: 'center', lineHeight: '1.2', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div>{data.label}</div>
      <div style={{ fontSize: '9px', fontWeight: 'normal', marginTop: '2px' }}>
        Parallel
      </div>
      <div style={{
        fontSize: '8px',
        color: '#666',
        marginTop: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <span>⏳</span>
        <span>Wait All</span>
      </div>
    </div>

    {/* Output handle for when all parallel tasks complete */}
    <Handle type="source" position={Position.Right} />
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export default ParallelTasksGroup;