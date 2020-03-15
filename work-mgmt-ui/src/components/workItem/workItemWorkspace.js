import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// import { Route, Switch, NavLink, useRouteMatch } from "react-router-dom";
import Constants from "../../shared/constants";
import WorkItemService from "../../services/workItemService";
import WorkItemList from "./workItemList";
import WorkItemBase from "./workItemBase";

class WorkItemWorkspace extends Component {
  componentName = "WorkItemWorkspace";

  constructor() {
    super();

    this.state = {
      selectedWorkItem: {},
      workItemList: [],
      formMode: Constants.FormMode.View
    };

    this.setRouteMatch("", "");
    console.debug(`[${this.componentName}] constructor()`);
  }

  async componentDidMount() {
    console.debug(`[${this.componentName}] componentDidMount()`);
    this.setRouteMatch(this.props.match.path, this.props.match.url);

    const workItemList = await WorkItemService.getAllAsync();
    this.setState({ workItemList });

    console.debug(`[${this.componentName}] componentDidMount() >> workItemList: `, workItemList);
  }

  setRouteMatch(path, url) {
    console.debug(`[${this.componentName}] setRouteMatch() >> path: "${path}", url: "${url}"`);
    this.routeMatch = {
      path: path,
      url: url
    };
  }

  selectedWorkItemChanged = selectedWorkItem => {
    console.debug(`[${this.componentName}] selectedWorkItemChanged()`);
    // Shortcut for 'this.setState({selectedWorkItem: selectedWorkItem});'
    this.setState({ formMode: Constants.FormMode.View, selectedWorkItem });
  };

  showWorkItemForm = () => {
    console.debug(
      `[${this.componentName}] showWorkItemForm() >> ${this.state.selectedWorkItem.id === undefined}, id: `,
      this.state.selectedWorkItem.id
    );
    return this.state.selectedWorkItem.id === undefined;
  };

  newWorkItem = () => {
    console.debug(`[${this.componentName}] newWorkItem()`);
  };

  editWorkItem = () => {
    console.debug(`[${this.componentName}] editWorkItem()`);
    this.setState({ formMode: Constants.FormMode.Edit });
  };

  saveWorkItem = () => {
    console.debug(`[${this.componentName}] saveWorkItem()`);
  };

  deleteWorkItem = () => {
    console.debug(`[${this.componentName}] deleteWorkItem()`, this);
    this.setState(currentState => {
      const updatedWorkItemList = currentState.workItemList.filter(
        (value, index, arr) => value.id !== currentState.selectedWorkItem.id
      );
      return { workItemList: updatedWorkItemList, selectedWorkItem: {} };
    });
  };

  render() {
    console.debug(`[${this.componentName}] render() >> Rendering...`);
    // const { workItemList, selectedWorkItem } = this.props;

    return (
      <div>
        <div>
          <WorkItemList
            workItemList={this.state.workItemList}
            selectedWorkItem={this.state.selectedWorkItem}
            routeMatch={this.routeMatch}
            newWorkItem={this.newWorkItem}
            editWorkItem={this.editWorkItem}
            saveWorkItem={this.saveWorkItem}
            deleteWorkItem={this.deleteWorkItem}
            selectedWorkItemChanged={this.selectedWorkItemChanged}
          />
        </div>
        <div>
          <div hidden={!this.showWorkItemForm()}>
            <Switch>
              <Route
                exact
                path={`${this.routeMatch.path}/:id/view`}
                render={(self, props, state) => (
                  <WorkItemBase
                    mode={Constants.FormMode.View}
                    workItem={state.selectedWorkItem}
                    routeMatch={self.routeMatch}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path={`${this.routeMatch.path}/:id/edit`}
                render={(self, props, state) => (
                  <WorkItemBase
                    mode={Constants.FormMode.Edit}
                    workItem={state.selectedWorkItem}
                    routeMatch={self.routeMatch}
                    {...props}
                  />
                )}
              />
              <Route path={`${this.routeMatch.path}/:id/delete`} exact component={WorkItemBase} />
            </Switch>
            {/* <WorkItemBase
              mode={this.state.formMode}
              workItem={selectedWorkItem}
              routeMatch={this.routeMatch}
              history={this.props.history}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default WorkItemWorkspace;
