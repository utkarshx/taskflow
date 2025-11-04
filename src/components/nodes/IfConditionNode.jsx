import React from 'react';
import { Handle, Position } from '@xyflow/react';

const IfConditionNode = ({ data }) => {
  const hasPrompt = data.prompt && data.prompt.trim() !== '';
  const isEvaluated = data.isEvaluated || false;
  const result = data.result !== undefined ? data.result : null;

  return (
    <div
      style={{
        background: '#fff',
        border: `2px solid ${hasPrompt ? (isEvaluated ? (result ? '#28a745' : '#dc3545') : '#17a2b8') : '#6c757d'}`,
        borderRadius: '8px',
        width: '160px',
        height: '80px',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '11px',
        fontWeight: 'bold',
        position: 'relative',
        padding: '8px',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Handle type="target" position={Position.Top} id="input" />

      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '4px' }}>
          {data.label || 'If Condition'}
        </div>
        <div style={{
          fontSize: '9px',
          color: hasPrompt ?
            (isEvaluated ? (result ? '#28a745' : '#dc3545') : '#17a2b8') :
            '#6c757d',
          fontWeight: 'normal'
        }}>
          {!hasPrompt ? '📝 Click to configure' :
           isEvaluated ? (result ? '✅ PROCEED' : '❌ STOP') : '🔍 Ready'}
        </div>
      </div>

      {/* Simple indicator showing if condition will allow flow */}
      <div
        style={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '16px',
          color: hasPrompt && result !== false ? '#28a745' : '#ccc',
        }}
      >
        →
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{
          background: hasPrompt && result !== false ? '#28a745' : '#ccc',
          borderColor: hasPrompt && result !== false ? '#28a745' : '#ccc',
        }}
      />

      {/* Configuration indicator */}
      {hasPrompt && (
        <div
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: isEvaluated ? (result ? '#28a745' : '#dc3545') : '#17a2b8',
          }}
        />
      )}
    </div>
  );
};

export default IfConditionNode;