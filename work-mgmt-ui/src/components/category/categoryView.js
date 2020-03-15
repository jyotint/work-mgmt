import React, { Component } from "react";

class CategoryView extends Component {
  componentName = "CategoryView";

  constructor() {
    super();

    console.debug(`[${this.componentName}] constructor()`);
  }
  render() {
    console.debug(`[${this.componentName}] render() >> Rendering...`);

    return <div><p>Category View</p></div>;
  }
}

export default CategoryView;
