import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

const ParallelTasksGroup = ({ data, id }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tasks, setTasks] = useState(data.tasks || []);

  const addTask = () => {
    const newTask = {
      id: `${id}-task-${tasks.length + 1}`,
      label: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div
      style={{
        background: '#f0fff0',
        border: '2px solid #28a745',
        borderRadius: '8px',
        minWidth: '250px',
        minHeight: isExpanded ? Math.max(150, tasks.length * 50 + 100) : '60px',
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
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#218838';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#28a745';
            e.target.style.transform = 'scale(1)';
          }}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>
      {isExpanded && (
        <div>
          <div
            style={{
              border: '1px dashed #28a745',
              borderRadius: '4px',
              padding: '10px',
              minHeight: '60px',
              backgroundColor: '#fafafa',
            }}
          >
            {tasks.length === 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666',
                  fontSize: '11px',
                  minHeight: '60px',
                }}
              >
                <div>No tasks yet</div>
                <div style={{ fontSize: '10px', marginTop: '5px' }}>
                  Click + to add tasks
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: '8px 12px',
                      fontSize: '11px',
                    }}
                  >
                    <span>{task.label}</span>
                    <button
                      onClick={() => removeTask(task.id)}
                      style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '10px',
                        padding: '2px 6px',
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={addTask}
            style={{
              marginTop: '10px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
              padding: '6px 12px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                border: '2px solid white',
                borderRadius: '50%',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
              >
                +
              </span>
            </span>
            Add Task
          </button>
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ParallelTasksGroup;