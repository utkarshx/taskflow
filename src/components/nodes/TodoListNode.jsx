import React from 'react';
import { Handle, Position } from '@xyflow/react';

const TodoListNode = ({ data }) => {
  const todoListId = data.todoListId || 'Not configured';
  const todoCount = data.todoCount || 0;
  const completedCount = data.completedCount || 0;
  const isConfigured = data.todoListId && data.todoListId.trim() !== '';

  return (
    <div
      style={{
        background: isConfigured ? '#fff3cd' : '#f8f9fa',
        border: `2px solid ${isConfigured ? '#856404' : '#6c757d'}`,
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
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      <div style={{ textAlign: 'center', marginBottom: '6px' }}>
        <div>{data.label || 'Todo List'}</div>
        <div style={{ fontSize: '9px', color: isConfigured ? '#856404' : '#6c757d', fontWeight: 'normal' }}>
          {isConfigured ? `${completedCount}/${todoCount} completed` : 'Click to configure'}
        </div>
      </div>

      {/* Todo List Info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {isConfigured ? (
          <>
            <div style={{ fontSize: '9px', color: '#666', marginBottom: '4px' }}>
              List ID: {todoListId}
            </div>
            <div style={{ fontSize: '8px', color: '#666' }}>
              Progress: {todoCount > 0 ? Math.round((completedCount / todoCount) * 100) : 0}%
            </div>
            {/* Progress bar */}
            <div
              style={{
                width: '100%',
                height: '4px',
                background: '#e9ecef',
                borderRadius: '2px',
                overflow: 'hidden',
                marginTop: '4px',
                border: '1px solid #ddd',
              }}
            >
              <div
                style={{
                  width: `${todoCount > 0 ? (completedCount / todoCount) * 100 : 0}%`,
                  height: '100%',
                  background: '#856404',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </>
        ) : (
          <div style={{ fontSize: '10px', color: '#6c757d', textAlign: 'center' }}>
            No todo list selected
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

export default TodoListNode;