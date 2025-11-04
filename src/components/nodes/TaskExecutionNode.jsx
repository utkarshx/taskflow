import React from 'react';
import { Handle, Position } from '@xyflow/react';

const TaskExecutionNode = ({ data }) => {
  return (
    <div
      style={{
        background: '#f8f9fa',
        border: '2px solid #6f42c1',
        borderRadius: '8px',
        width: '180px',
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '11px',
        fontWeight: 'bold',
        position: 'relative',
        padding: '8px',
        cursor: 'pointer',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '6px' }}>
        <div>{data.label || 'Loop'}</div>
        <div style={{ fontSize: '9px', color: '#6f42c1', fontWeight: 'normal' }}>
          For each todo
        </div>
      </div>

      {/* Central loop visualization */}
      <div
        style={{
          flex: 1,
          background: '#f8f9fa',
          border: '1px dashed #6f42c1',
          borderRadius: '4px',
          padding: '12px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div style={{ fontSize: '10px', color: '#666' }}>
          {/* Loop arrows visualization */}
          <svg
            width="40"
            height="20"
            viewBox="0 0 40 20"
            fill="none"
            stroke="#6f42c1"
            strokeWidth="2"
          >
            <path d="M8 10 Q 20 2, 32 10 Q 20 18, 8 10" />
            <path d="M30 8 L 32 10 L 30 12" />
          </svg>
        </div>

        {/* Top connection label */}
        <div
          style={{
            position: 'absolute',
            top: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '8px',
            color: '#6f42c1',
            fontWeight: 'bold',
          }}
        >
          Trigger
        </div>

        {/* Left connection label */}
        <div
          style={{
            position: 'absolute',
            left: '-35px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '8px',
            color: '#6f42c1',
            fontWeight: 'bold',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          Todo List
        </div>

        {/* Right connection label */}
        <div
          style={{
            position: 'absolute',
            right: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '8px',
            color: '#6f42c1',
            fontWeight: 'bold',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          Task
        </div>

        {/* Bottom connection label */}
        <div
          style={{
            position: 'absolute',
            bottom: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '8px',
            color: '#6f42c1',
            fontWeight: 'bold',
          }}
        >
          Done
        </div>
      </div>

      {/* Input handles */}
      <Handle type="target" position={Position.Top} id="trigger" />
      <Handle type="target" position={Position.Left} id="todolist" />

      {/* Output handles */}
      <Handle type="source" position={Position.Right} id="task" />
      <Handle type="source" position={Position.Bottom} id="completed" />
    </div>
  );
};

export default TaskExecutionNode;