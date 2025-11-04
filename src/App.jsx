import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Flow from './components/Flow';

export default function App() {
  return (
    <>
      <style>
        {`
          [title] {
            position: relative;
          }

          /* Remove native tooltip delay */
          [title]:hover::after {
            content: attr(title);
            position: absolute;
            left: 40px;
            top: 50%;
            transform: translateY(-50%);
            background: #333;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 10000;
            pointer-events: none;
            opacity: 1;
          }
        `}
      </style>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </>
  );
}