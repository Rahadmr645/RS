import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import eruda from 'eruda'
import { ContextProvider } from './context/StoreContext.jsx'
import { BrowserRouter } from 'react-router-dom';
eruda.init();
createRoot(document.getElementById('root')).render(


  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>


)
