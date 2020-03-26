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
          <Route path={Constants.Route.Root} exact component={HomeWorkspace} />
          <Route path={Constants.Route.WorkItems} render={props => <WorkItemWorkspace {...props} />} />
          <Route path={Constants.Route.Categories} component={CategoryWorkspace} />
          <Route path={Constants.Route.Tags} component={TagWorkspace} />
        </Switch>
      </div>
    );
  }
}

export default Body;
