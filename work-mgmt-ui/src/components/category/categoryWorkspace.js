import React, { Component } from "react";

class CategoryWorkspace extends Component {
  componentName = "CategoryWorkspace";

  constructor() {
    super();

    console.debug(`[${this.componentName}] constructor()`);
  }

  render() {
    console.debug(`[${this.componentName}] render() >> Rendering...`);
    // const { history, match } = this.props;
    // console.debug(`[${this.componentName}] render() >> Rendering...`, match);

    return <div><p>Category Workspace</p></div>;
  }
}

export default CategoryWorkspace;
