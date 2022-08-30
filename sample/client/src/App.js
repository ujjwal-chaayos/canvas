import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AllRoutes from "./routes/Routes";
// import { CSSTransition } from "react-transition-group";

//main branch is back

import "./main.css";

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
