import React from "react";
import { Route, Switch } from "react-router-dom";
// import { Route, Switch, NavLink, useRouteMatch } from "react-router-dom";
import Constants from "../../shared/constants";
import { WorkItemModel } from "../../models/workItemModel";
import WorkItemService from "../../services/workItemService";
import { WorkItemList } from "./workItemList";
import { WorkItemBase } from "./workItemBase";

export interface WorkItemWorkspaceProps {
  match: any;
};
export interface WorkItemWorkspaceState {
  formMode: string;
  selectedWorkItem: WorkItemModel;
  workItemList: WorkItemModel[] | undefined;
};

class WorkItemWorkspace extends React.Component<WorkItemWorkspaceProps, WorkItemWorkspaceState> {
  private componentName: string = "WorkItemWorkspace";
  private routeMatch: any;

  // Initialie "state"
  state: WorkItemWorkspaceState = {
    formMode: Constants.FormMode.View,
    selectedWorkItem: new WorkItemModel(),
    workItemList: []
  };

  constructor(props: WorkItemWorkspaceProps, state: WorkItemWorkspaceState) {
    super(props, state);

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

  setRouteMatch(path: string, url: string): void {
    console.debug(`[${this.componentName}] setRouteMatch() >> path: "${path}", url: "${url}"`);
    this.routeMatch = {
      path: path,
      url: url
    };
  }

  selectedWorkItemChanged = (selectedWorkItem: WorkItemModel) => {
    console.debug(`[${this.componentName}] selectedWorkItemChanged()`);
    // Shortcut for 'this.setState({selectedWorkItem: selectedWorkItem});'
    this.setState({ formMode: Constants.FormMode.View, selectedWorkItem });
  };

  showWorkItemForm = () => {
    // @ts-ignore
    const id = (this.state.selectedWorkItem || {}).id;

    console.debug(`[${this.componentName}] showWorkItemForm() >> ${id === undefined}, id: ${id}`);
    return id === undefined;
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
  };

  render() {
    console.debug(`[${this.componentName}] render() >> Rendering...`);
    // const { workItemList, selectedWorkItem } = this.props;

    return (
      <div>
        <div>
          <WorkItemList
            selectedWorkItem={this.state.selectedWorkItem}
            routeMatch={this.routeMatch}
            workItemList={this.state.workItemList}
            newWorkItem={this.newWorkItem}
            editWorkItem={this.editWorkItem}
            saveWorkItem={this.saveWorkItem}
            deleteWorkItem={this.deleteWorkItem}
            selectedWorkItemChanged={this.selectedWorkItemChanged}
          />
        </div>
      </div>
    );
  }
}

export default WorkItemWorkspace;
