import React, { Component } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Routes from "./pages/components/Routes";

class App extends Component {
  render() {
    let componentToRender;
    if (localStorage.getItem("jwtToken")) {
      componentToRender = <Welcome />;
    } else {
      componentToRender = <Home />;
    }
    return (
      <div>
        {componentToRender}
      </div>
    );
  }
}

export default App;
