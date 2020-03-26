import React from "react";
import { Route, Switch } from "react-router-dom";
// import { Route, Switch, NavLink, useRouteMatch } from "react-router-dom";
import Constants from "../../shared/constants";
import { ObjectLiteral } from "../../shared/typeScriptExtension";
import { WorkItemModel } from "../../models/workItemModel";
import WorkItemService from "../../services/workItemService";
import { WorkItemModelObject, WorkItemModelList, WorkItemWorkspaceViewState } from "./workItemShared";
import { WorkItemList } from "./workItemList";
import { WorkItemBase } from "./workItemBase";
import { GetMatchforPath } from "../../shared/helpers";
import { ResponseModelObject } from "../../models/responseModel";

export interface WorkItemWorkspaceProps {
  match: any;
  history: any;
};
export interface WorkItemWorkspaceState {
  formMode: string;
  workspaceViewState: WorkItemWorkspaceViewState;
  selectedWorkItem: WorkItemModelObject;
  workItemList: WorkItemModelList;
};

class WorkItemWorkspace extends React.Component<WorkItemWorkspaceProps, WorkItemWorkspaceState> {
  private componentName: string = "WorkItemWorkspace";

  // Initialize "state"
  state: WorkItemWorkspaceState = {
    formMode: Constants.FormMode.View,
    workspaceViewState: WorkItemWorkspaceViewState.ShowList,
    selectedWorkItem: undefined,
    workItemList: undefined
  }

  constructor(props: WorkItemWorkspaceProps, state: WorkItemWorkspaceState) {
    super(props, state);

    console.debug(`[${this.componentName}] constructor()`);
  }

  async componentDidMount() {
    console.debug(`[${this.componentName}] componentDidMount()`);

    const { match, viewState } = this.GetWorkspaceViewState(this.props.history);
    await this.loadData(match, viewState);
  }

  loadData = async (match: any, viewState: WorkItemWorkspaceViewState): Promise<void> => {
    if (viewState === WorkItemWorkspaceViewState.ShowObject) {
      if (this.state.selectedWorkItem === undefined) {
        const id: string = match.params.id;
        const data = await this.getWorkItemById(id);
        this.setState({
          workspaceViewState: viewState,
          selectedWorkItem: data
        });
      }
    }

    // if (viewState === WorkItemWorkspaceViewState.ShowList) {
      if (this.state.workItemList === undefined) {
        const data = await this.getWorkItems();
        if (data) {
          this.setState({
            workspaceViewState: viewState,
            workItemList: data
          });
        }
      }
    // }
  }

  getWorkItemById = async (id: string): Promise<WorkItemModelObject> => {
    let data: WorkItemModelObject = undefined

    const result = await WorkItemService.getAsync(id);
    if (result.isStatusSuccessful()) {
      data = result.getDataObject<WorkItemModel>();
    }
    return data;
  }

  getWorkItems = async (): Promise<WorkItemModelList> => {
    let data: WorkItemModelList = undefined;

    const result = await WorkItemService.getAllAsync();
    if (result.isStatusSuccessful()) {
      data = result.getDataList<WorkItemModel>();
    }

    return data;
  }

  selectedWorkItemChanged = (selectedWorkItem: WorkItemModel): void => {
    console.debug(`[${this.componentName}] selectedWorkItemChanged() >> selectedWorkItem.id: ${selectedWorkItem?.id}`);
    // Shortcut for 'this.setState({selectedWorkItem: selectedWorkItem});'
    this.setState({
      selectedWorkItem,
      formMode: Constants.FormMode.View
    });
  }

  showWorkItemForm = () => {
    const id = this.state.selectedWorkItem?.id;
    console.debug(`[${this.componentName}] showWorkItemForm() >> ${id === undefined}, id: ${id}`);
    return id === undefined;
  }

  newWorkItem = async (id: string): Promise<void> => {
    console.debug(`[${this.componentName}] newWorkItem()`);
  }

  viewWorkItem = async (id: string): Promise<void> => {
    console.debug(`[${this.componentName}] viewWorkItem() >> id: ${id}`);
    this.setState({
      formMode: Constants.FormMode.View,
      workspaceViewState: WorkItemWorkspaceViewState.ShowObject
    });
  }

  editWorkItem = async (id: string): Promise<void> => {
    console.debug(`[${this.componentName}] editWorkItem() >> id: ${id}`);
    this.setState({
      formMode: Constants.FormMode.Edit
    });
  }

  saveWorkItem = async (id: string): Promise<void> => {
    console.debug(`[${this.componentName}] saveWorkItem() >> id: ${id}`);
  }

  deleteWorkItem = async (id: string): Promise<void> => {
    console.debug(`[${this.componentName}] deleteWorkItem() >> id: ${id}`);
    if (id !== undefined) {
      const result = await WorkItemService.deleteAsync(id);
      if (result.isStatusSuccessful()) {
        const filteredList = this.state.workItemList?.filter(item => {
          return item.id !== id;
        });

        // Create new state object literal and set it using setState()
        const newState: ObjectLiteral = { workItemList: filteredList };
        if (this.state.selectedWorkItem?.id === id) {
          // If currently selected item is same as being deleted, than set "selectedWorkItem" to undefined
          newState["selectedWorkItem"] = undefined;
        };
        this.setState(newState as WorkItemWorkspaceState);
      }
    }
  }

  GetMatchforAllPaths = (history: any): any => {
    const match = GetMatchforPath(history,
      Constants.Route.WorkItemsWithId,
      Constants.Route.WorkItems);
    console.debug(`[${this.componentName}] GetMatchforAllPaths() >> `, history, match);
    return match;
  }

  private GetWorkspaceViewState(history: any) {
    let viewState: WorkItemWorkspaceViewState = WorkItemWorkspaceViewState.None;

    const match = this.GetMatchforAllPaths(history);
    switch (match.path) {
      case Constants.Route.WorkItemsWithId:
        viewState = WorkItemWorkspaceViewState.ShowObject;
        break;
      case Constants.Route.WorkItems:
        viewState = WorkItemWorkspaceViewState.ShowList;
        break;
    }
    return { match, viewState };
  }

  render() {
    console.debug(`[${this.componentName}] render() >> Rendering...`);
    const { history } = this.props;
    const match = this.GetMatchforAllPaths(history);
    // console.debug(`[${this.componentName}] render() >> Rendering...`, history, match);
    // await this.loadData(match, this.state.workspaceViewState);

    return (
      <div>
        <Switch>
          <Route path={Constants.Route.WorkItemsWithId} render={() => {
            // console.log(`[${this.componentName}] Loading 'WorkItemBase' component...`);
            return (<WorkItemBase
              mode={this.state.formMode}
              workItem={this.state.selectedWorkItem}
              routeMatch={match}
              history={history}
            />);
          }} />
          <Route path={`${Constants.Route.WorkItems}`} render={() => {
            // console.log(`[${this.componentName}] Loading 'WorkItemList' component...`);
            return (<WorkItemList
              selectedWorkItem={this.state.selectedWorkItem}
              routeMatch={match}
              history={history}
              workItemList={this.state.workItemList}
              newWorkItem={this.newWorkItem.bind(this)}
              viewWorkItem={this.viewWorkItem.bind(this)}
              editWorkItem={this.editWorkItem.bind(this)}
              saveWorkItem={this.saveWorkItem.bind(this)}
              deleteWorkItem={this.deleteWorkItem.bind(this)}
              selectedWorkItemChanged={this.selectedWorkItemChanged.bind(this)}
            />);
          }} />
        </Switch>
      </div>
    );
  }
};

export default WorkItemWorkspace;
