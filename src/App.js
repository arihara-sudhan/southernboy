import React, { useState, useEffect } from 'react';
import Banner from './components/banner';
import Posts from './components/posts';
import End from './components/end';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


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
        <Routes>
          <Route path="/" element={<Posts />}/>
          <Route path="/:id" element={<Posts/>}/>
        </Routes>
        <End />
      </div>
      </Router>
);
}

export default App;


