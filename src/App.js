import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Banner from './components/banner';
import Posts from './components/posts';
import End from './components/end';
import './App.css';

function App() {
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => setSpinner(false), 1000);
  }, []);

  if (spinner) {
    return <center>LOADING</center>;
  }

  return (
    <Router>
      <div className="app">
        <Banner />
        <Posts />
        <End />
      </div>
    </Router>
  );
}

export default App;
