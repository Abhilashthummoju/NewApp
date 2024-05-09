// App.js

import React from 'react';
import { BrowserRouter as Router, Route,Routes,Navigate } from 'react-router-dom';
import Auth from './auth';
import Home from './Home';
import Employee from './Employee';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Navigate to="/auth" />} /> {/* Redirect to /auth */}
        <Route exact path="/auth" element={<Auth/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/employee" element={<Employee/>} />
      </Routes>
    </Router>
  );
};

export default App;
