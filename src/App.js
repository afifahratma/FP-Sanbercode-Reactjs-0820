import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './layout/Main'
import 'react-bootstrap-table-next'
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserProvider} from './context/UserContext'
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <div>
      <UserProvider>
        <Router>
         <Main/>
      </Router>
      </UserProvider>
   </div>
  );
}

export default App;
