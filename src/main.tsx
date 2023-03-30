import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from "react-router-dom";
import './App.css';
import './index.css'
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  //  </React.StrictMode>,
)
