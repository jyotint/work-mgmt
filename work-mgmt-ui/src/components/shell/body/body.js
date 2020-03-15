import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import HomeView from "../../home/homeView";
import CategoryView from "../../category/categoryView";
import WorkItemWorkspace from "../../workItem/workItemWorkspace";
import TagView from "../../tag/tagView";

class Body extends Component {
  componentName = "Body";

  render() {
    console.debug(`[${this.componentName}] render() >> Rendering...`);

    return (
      <div>
        <Switch>
          <Route path="/" exact component={HomeView} />
          <Route path="/workitem" exact render={props => <WorkItemWorkspace {...props} />} />
          <Route path="/categories" exact component={CategoryView} />
          <Route path="/tags" exact component={TagView} />
        </Switch>
      </div>
    );
  }
}

export default Body;
