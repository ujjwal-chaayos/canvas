import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import AllRoutes from './Routes'


function App() {
  return (
    <div className="App">
      <Router>
      <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
