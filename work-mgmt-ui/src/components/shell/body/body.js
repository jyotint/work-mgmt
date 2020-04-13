import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Constants from "../../../shared/constants";
import HomeWorkspace from "../../home/homeWorkspace";
import CategoryWorkspace from "../../category/categoryWorkspace";
import WorkItemWorkspace from "../../workItem/workItemWorkspace";
import TagWorkspace from "../../tag/tagWorkspace";

class Body extends Component {
  componentName = "Body";

  render() {
    console.debug(`[${this.componentName}] render() >> Rendering...`);

    return (
      <div>
        <Switch>
          <Route path={Constants.route.root} exact component={HomeWorkspace} />
          <Route path={Constants.route.workItems} render={props => <WorkItemWorkspace {...props} />} />
          <Route path={Constants.route.categories} component={CategoryWorkspace} />
          <Route path={Constants.route.tags} component={TagWorkspace} />
        </Switch>
      </div>
    );
  }
}

export default Body;
