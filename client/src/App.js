import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Search from "./pages/Search.js";
import Save from "./pages/Save.js";

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        < Nav />
        < Header />
        <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/saved" component={Save} />
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
