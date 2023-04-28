import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import UserList from './components/UserList';
import User from './components/User';

function App() {
  return (
    <Router>
      <div className="App">
        <div id="app">
          <Routes>
            <Route path="/users" element={<UserList/>} />
            <Route path="/user/:id" element={<User />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
