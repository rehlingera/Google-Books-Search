import React, { Component } from "react";
import "./App.css";
import Books from "./pages/Books";
import Search from "./pages/Search";
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
          <Route exact path="/" component={Books} />
          <Route exact path="/search" component={Search} />
      </div>
    </Router>
    );
  }
}

export default App;
