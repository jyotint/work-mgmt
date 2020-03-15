import React, { Component } from "react";

class HomeView extends Component {
  componentName = "HomeView";

  constructor() {
    super();

    console.debug(`[${this.componentName}] constructor()`);
  }
  render() {
    console.debug(`[${this.componentName}] render() >> Rendering...`);

    return <div><p>Home View</p></div>;
  }
}

export default HomeView;
