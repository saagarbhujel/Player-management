import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './globals.css'
import {BrowserRouter} from "react-router-dom";
import { ToastContest } from './context/ToastContest.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
      <ToastContest>
    <App />
      </ToastContest>
      </BrowserRouter>
  </React.StrictMode>,
)
