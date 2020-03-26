import React, { Component } from "react";

class TagWorkspace extends Component {
  componentName = "TagWorkspace";

  constructor() {
    super();

    console.debug(`[${this.componentName}] constructor()`);
  }

  render() {
    console.debug(`[${this.componentName}] render() >> Rendering...`);
    // const { history, match } = this.props;
    // console.debug(`[${this.componentName}] render() >> Rendering...`, match);

    return (<div><p>Tag Workspace</p></div>);
  }
}

export default TagWorkspace;
