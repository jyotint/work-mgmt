import React, { Component } from "react";

class HomeWorkspace extends Component {
  componentName = "HomeWorkspace";

  constructor() {
    super();

    console.debug(`[${this.componentName}] constructor()`);
  }

  render() {
    console.debug(`[${this.componentName}] render() >> Rendering...`);
    // const { history, match } = this.props;
    // console.debug(`[${this.componentName}] render() >> Rendering...`, match);

    return <div><p>Home Workspace</p></div>;
  }
}

export default HomeWorkspace;
