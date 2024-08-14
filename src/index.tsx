import React from 'react';
import ReactDOM from 'react-dom/client';
import {WebSocketControlPanel} from "./components/webSocketControlPanel";
import {SimpleForm} from "./components/simpleform";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <SimpleForm></SimpleForm>
      <WebSocketControlPanel buttonName={"Присоединиться по WS"}></WebSocketControlPanel>
  </React.StrictMode>
);

