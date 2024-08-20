import React from 'react';
import ReactDOM from 'react-dom/client';
import {WebChatPanel} from "./components/chat/WebChatPanel";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
        <WebChatPanel></WebChatPanel>
  </React.StrictMode>
);

