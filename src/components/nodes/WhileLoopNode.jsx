import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

const WhileLoopNode = ({ data }) => {
  const [condition, setCondition] = useState(data.condition || '');
  const [iterationCount, setIterationCount] = useState(data.iterationCount || 0);
  const [isLooping, setIsLooping] = useState(false);

  const startLoop = () => {
    if (condition.trim()) {
      setIsLooping(true);
      setIterationCount(0);
    }
  };

  const nextIteration = () => {
    setIterationCount(prev => prev + 1);
  };

  const stopLoop = () => {
    setIsLooping(false);
  };

  const updateCondition = (value) => {
    setCondition(value);
  };

  return (
    <div
      style={{
        background: '#fff5f5',
        border: '2px solid #dc3545',
        borderRadius: '8px',
        width: '200px',
        minHeight: '160px',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '11px',
        fontWeight: 'bold',
        position: 'relative',
        padding: '8px',
        cursor: 'pointer',
      }}
    >
      <Handle type="target" position={Position.Top} />

      <div style={{ textAlign: 'center', marginBottom: '6px' }}>
        <div>{data.label || 'While Loop'}</div>
        <div style={{ fontSize: '9px', color: '#dc3545', fontWeight: 'normal' }}>
          Iteration: {iterationCount}
        </div>
      </div>

      {/* Condition */}
      <div style={{ marginBottom: '6px' }}>
        <label style={{ fontSize: '9px', color: '#666', marginBottom: '2px' }}>
          Condition:
        </label>
        <input
          type="text"
          value={condition}
          onChange={(e) => updateCondition(e.target.value)}
          placeholder="Enter condition..."
          style={{
            width: '100%',
            fontSize: '9px',
            padding: '4px',
            border: '1px solid #ddd',
            borderRadius: '3px',
          }}
        />
      </div>

      {/* Loop visualization */}
      <div
        style={{
          background: '#ffe6e6',
          border: '1px dashed #dc3545',
          borderRadius: '4px',
          padding: '8px',
          marginBottom: '6px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '10px', color: '#dc3545', fontWeight: 'bold' }}>
          {isLooping ? '🔄 LOOPING' : '⏸️ STOPPED'}
        </div>
        {isLooping && (
          <div style={{ fontSize: '8px', color: '#666', marginTop: '2px' }}>
            while ({condition})
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '6px' }}>
        <button
          onClick={startLoop}
          disabled={isLooping || !condition.trim()}
          style={{
            background: isLooping ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: isLooping || !condition.trim() ? 'not-allowed' : 'pointer',
            fontSize: '8px',
            padding: '4px 8px',
          }}
        >
          {isLooping ? 'Running' : 'Start'}
        </button>
        <button
          onClick={nextIteration}
          disabled={!isLooping}
          style={{
            background: !isLooping ? '#6c757d' : '#ffc107',
            color: !isLooping ? '#fff' : '#000',
            border: 'none',
            borderRadius: '3px',
            cursor: !isLooping ? 'not-allowed' : 'pointer',
            fontSize: '8px',
            padding: '4px 8px',
          }}
        >
          Next
        </button>
        <button
          onClick={stopLoop}
          disabled={!isLooping}
          style={{
            background: !isLooping ? '#6c757d' : '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: !isLooping ? 'not-allowed' : 'pointer',
            fontSize: '8px',
            padding: '4px 8px',
          }}
        >
          Stop
        </button>
      </div>

      {/* Loop indicators */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '8px', color: '#666' }}>
          Input → Loop Body → Output
        </div>
        {isLooping && (
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#dc3545',
              animation: 'pulse 1.5s infinite',
            }}
          />
        )}
      </div>

      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Left} />

      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default WhileLoopNode;