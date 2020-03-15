import React, { Component } from "react";
import Header from "../header/header";
import Body from "../body/body";

class App extends Component {
  // TODO Is this another way to get classname instead of hard coding
  componentName = "App";

  render() {
    console.debug(`[${this.componentName}] render() >> Rendering...`);

    return (
      <div>
        <Header />
        <Body />
      </div>
    );
  }
}

export default App;
