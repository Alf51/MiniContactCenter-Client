import React from 'react';
import ReactDOM from 'react-dom/client';
import {WebSocketControlPanel} from "./components/webSocketControlPanel";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <WebSocketControlPanel buttonName={"Присоединиться по WS"}></WebSocketControlPanel>
  </React.StrictMode>
);

