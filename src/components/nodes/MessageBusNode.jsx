import React from 'react';
import { Handle, Position } from '@xyflow/react';

const MessageBusNode = ({ data }) => {
  const messageBusId = data.messageBusId || 'Not configured';
  const mode = data.mode || 'sender'; // sender or receiver
  const isConfigured = data.messageBusId && data.messageBusId.trim() !== '';

  return (
    <div
      style={{
        background: isConfigured ? '#e7f3ff' : '#f8f9fa',
        border: `2px solid ${isConfigured ? '#0066cc' : '#6c757d'}`,
        borderRadius: '8px',
        width: '180px',
        minHeight: '80px',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '11px',
        fontWeight: 'bold',
        position: 'relative',
        padding: '8px',
        cursor: 'pointer',
      }}
    >
      {/* Input/Output handles based on mode */}
      {mode === 'sender' ? (
        <>
          <Handle type="target" position={Position.Top} />
          <Handle type="source" position={Position.Bottom} />
          <Handle type="source" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </>
      ) : (
        <>
          <Handle type="target" position={Position.Left} />
          <Handle type="target" position={Position.Right} />
          <Handle type="target" position={Position.Top} />
          <Handle type="source" position={Position.Bottom} />
        </>
      )}

      <div style={{ textAlign: 'center', marginBottom: '6px' }}>
        <div>{data.label || 'Message Bus'}</div>
        <div style={{ fontSize: '9px', color: isConfigured ? '#0066cc' : '#6c757d', fontWeight: 'normal' }}>
          {isConfigured ? `${mode.toUpperCase()}` : 'Click to configure'}
        </div>
      </div>

      {/* Message Bus Info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {isConfigured ? (
          <>
            <div style={{ fontSize: '9px', color: '#666', marginBottom: '4px' }}>
              Bus ID: {messageBusId}
            </div>
            <div style={{
              fontSize: '8px',
              color: mode === 'sender' ? '#28a745' : '#ffc107',
              textAlign: 'center',
              marginTop: '4px'
            }}>
              {mode === 'sender' ? '📤 Broadcasting' : '📥 Listening'}
            </div>

            {/* Mode indicator */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '6px',
                padding: '2px 6px',
                borderRadius: '3px',
                background: mode === 'sender' ? '#d4edda' : '#fff3cd',
                border: `1px solid ${mode === 'sender' ? '#c3e6cb' : '#ffeaa7'}`,
              }}
            >
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: mode === 'sender' ? '#28a745' : '#ffc107',
                marginRight: '4px',
              }} />
              <div style={{ fontSize: '7px', color: mode === 'sender' ? '#155724' : '#856404' }}>
                {mode === 'sender' ? 'SENDER' : 'RECEIVER'}
              </div>
            </div>
          </>
        ) : (
          <div style={{ fontSize: '10px', color: '#6c757d', textAlign: 'center' }}>
            No message bus configured
          </div>
        )}
      </div>

      {/* Configuration indicator */}
      {isConfigured && (
        <div
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#28a745',
          }}
        />
      )}
    </div>
  );
};

export default MessageBusNode;