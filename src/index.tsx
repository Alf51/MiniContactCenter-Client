import React from 'react';
import ReactDOM from 'react-dom/client';
import WebSocketComponent from "./WebSocketConnectiont";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <WebSocketComponent></WebSocketComponent>
  </React.StrictMode>
);

