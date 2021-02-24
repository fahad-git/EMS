import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router} from "react-router-dom";

import NavbarHeader from './components/HeadersAndFooters/NavbarHeader';
import DashboardHeader from './components/HeadersAndFooters/DashboardHeader';
import Main from './components/Main';
import NavbarFooter from './components/HeadersAndFooters/NavbarFooter';

import { MyProvider } from './components/MyContext';

function App() {

  

  return (
    <Router>
      <div className="App">
        <MyProvider>
          <Main/>
        </MyProvider>
      </div>
    </Router>
  );
}

export default App;
