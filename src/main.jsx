import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Detail from './Detail.jsx'

import App from './App.jsx'
import './index.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router basename="/">
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="detail/:id" element={<Detail />} />
          </Routes>
      </Router>
  </React.StrictMode>
);
