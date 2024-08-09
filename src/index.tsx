import React from 'react';
import ReactDOM from 'react-dom/client';
import {SendUrlButtons} from "./components/sendUrlButtons";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <SendUrlButtons buttonName={"Присоединиться по WS"}></SendUrlButtons>
  </React.StrictMode>
);

