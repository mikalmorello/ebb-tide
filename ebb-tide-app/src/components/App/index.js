import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../Home";
import Tide from "../Tide";
import "./app.scss";

function App() {
  return(
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/tide" component={Tide} />
      <Route exact path="/tide/:slug" component={Tide} />
    </Router>
  )
}

export default App; 
