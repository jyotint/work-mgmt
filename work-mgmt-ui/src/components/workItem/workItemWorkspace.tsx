import React from "react";
import { Route, Switch } from "react-router-dom";
import Constants from "../../shared/constants";
import { GetMatchforPath } from "../../shared/helpers";
import { ObjectLiteral } from "../../shared/typeScriptExtension";
import { WorkItemModel, WorkItemModelObject, WorkItemModelList } from "../../models/workItemModel";
import WorkItemService from "../../services/workItemService";
import MetaDataService from "../../services/metaDataService";
import { WorkItemWorkspaceViewState } from "./workItemShared";
import { WorkItemList } from "./workItemList";
import { WorkItemBase } from "./workItemBase";
import { ResponseModel } from "../../models/responseModel";
import { UiDisplayDebugState } from "../ui-components/uiDisplayDebugState";

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
  private static metaData: ObjectLiteral = {};

  // Initialize "state"
  state: WorkItemWorkspaceState = {
    formMode: Constants.formMode.view,
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
    WorkItemWorkspace.metaData.statusMetaData = await MetaDataService.getStatusValues();
    await this.loadData(viewState, match, true);

    console.debug(`[${this.componentName}] componentDidMount() >> Done.`);
  }

  loadData = async (viewState: WorkItemWorkspaceViewState, match: any, forceReload: boolean): Promise<void> => {
    let workItemList: WorkItemModelList = undefined;
    let selectedWorkItem: WorkItemModelObject = undefined;

    // if (viewState === WorkItemWorkspaceViewState.ShowList) {
    if (this.state.workItemList === undefined || forceReload === true) {
      workItemList = await this.getWorkItems();
    }
    // }

    // if (viewState === WorkItemWorkspaceViewState.ShowObject) {
    if (this.state.selectedWorkItem === undefined || forceReload === true) {
      const id: string = (this.state.selectedWorkItem === undefined)
        ? match?.params.id
        : this.state.selectedWorkItem?.id;

      if (id !== undefined) {
        if (workItemList) {
          selectedWorkItem = workItemList.find(item => item.id === this.state.selectedWorkItem?.id);
        } else {
          selectedWorkItem = await this.getWorkItemById(id);
        }
      }
    }
    // }

    this.setWorkItemWorkspaceState(undefined, viewState, selectedWorkItem, workItemList);
  }

  getWorkItemById = async (id: string): Promise<WorkItemModelObject> => {
    let data: WorkItemModelObject = undefined

    const result: ResponseModel = await WorkItemService.getAsync(id);
    if (result.isStatusSuccessful()) {
      data = result.getDataObject<WorkItemModel>();
    }
    return data;
  }

  getWorkItems = async (): Promise<WorkItemModelList> => {
    let data: WorkItemModelList = undefined;

    const result: ResponseModel = await WorkItemService.getAllAsync();
    if (result.isStatusSuccessful()) {
      data = result.getDataList<WorkItemModel>();
    }

    return data;
  }

  selectedWorkItemChanged = (selectedWorkItem: WorkItemModel): void => {
    console.debug(`[${this.componentName}] selectedWorkItemChanged() >> selectedWorkItem.id: ${selectedWorkItem?.id}`);
    this.setWorkItemWorkspaceState(Constants.formMode.view, undefined, selectedWorkItem, undefined);
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
    this.setWorkItemWorkspaceState(Constants.formMode.view, WorkItemWorkspaceViewState.ShowObject, undefined, undefined);

    this.props.history.push(`${this.props.match.url}/${this.state.selectedWorkItem?.id}?ot=view`)
  }

  editWorkItem = async (id: string): Promise<void> => {
    console.debug(`[${this.componentName}] editWorkItem() >> id: ${id}`);
    this.setWorkItemWorkspaceState(Constants.formMode.edit, WorkItemWorkspaceViewState.ShowObject, undefined, undefined);

    this.props.history.push(`${this.props.match.url}/${this.state.selectedWorkItem?.id}?ot=edit`)
  }

  saveWorkItem = async (id: string, data: WorkItemModel): Promise<void> => {
    console.debug(`[${this.componentName}] saveWorkItem() >> id: ${id}, data: `, data);
    if (id !== undefined && data !== undefined) {
      const result = await WorkItemService.updateAsync(id, data);
      if (result.isStatusSuccessful()) {
        // TODO only update the changed WorkItem and not the entire list of WorkItems
        await this.loadData(WorkItemWorkspaceViewState.ShowList, undefined, true);
        this.props.history.push(`${this.props.match.url}`);
      }
    }
  }

  deleteWorkItem = async (id: string): Promise<void> => {
    console.debug(`[${this.componentName}] deleteWorkItem() >> id: ${id}`);

    if (id !== undefined) {
      const result = await WorkItemService.deleteAsync(id);
      if (result.isStatusSuccessful()) {
        const filteredList = this.state.workItemList?.filter(item => {
          return item.id !== id;
        });

        // If currently selected item is same as being deleted, than set "selectedWorkItem" to undefined
        let selectedWorkItem = (this.state.selectedWorkItem?.id === id) ? undefined : this.state.selectedWorkItem;
        this.setWorkItemWorkspaceState(undefined, undefined, selectedWorkItem, filteredList);
      }
    }
  }

  GetMatchforAllPaths = (history: any): any => {
    const match = GetMatchforPath(history,
      Constants.route.workItemsWithId,
      Constants.route.workItems);
    // console.debug(`[${this.componentName}] GetMatchforAllPaths() >> `, history, match);
    return match;
  }

  private GetWorkspaceViewState(history: any) {
    let viewState: WorkItemWorkspaceViewState = WorkItemWorkspaceViewState.None;

    const match = this.GetMatchforAllPaths(history);
    switch (match.path) {
      case Constants.route.workItemsWithId:
        viewState = WorkItemWorkspaceViewState.ShowObject;
        break;
      case Constants.route.workItems:
        viewState = WorkItemWorkspaceViewState.ShowList;
        break;
    }
    return { match, viewState };
  }

  setWorkItemWorkspaceState = (
    formMode: string | undefined,
    workspaceViewState: WorkItemWorkspaceViewState | undefined,
    selectedWorkItem: WorkItemModelObject,
    workItemList: WorkItemModelList): void => {
    // Create new state object literal and set it using setState()
    const newState: ObjectLiteral = {};

    if (formMode !== undefined) {
      newState["formMode"] = formMode;
    }

    if (workspaceViewState !== undefined) {
      newState["workspaceViewState"] = workspaceViewState;
    }

    if (selectedWorkItem !== undefined) {
      newState["selectedWorkItem"] = selectedWorkItem;
    }

    if (workItemList !== undefined) {
      newState["workItemList"] = workItemList;
    }

    console.debug(`[${this.componentName}] setWorkItemWorkspaceState() >> `, newState);
    this.setState(newState as WorkItemWorkspaceState);
  }

  render() {
    console.debug(`[${this.componentName}] render() >> Rendering...`);
    const { history } = this.props;
    const match = this.GetMatchforAllPaths(history);
    // console.debug(`[${this.componentName}] render() >> Rendering...`, history, match);

    return (
      <div>
        <Switch>
          <Route path={Constants.route.workItemsWithId} render={() => {
            // console.log(`[${this.componentName}] Loading 'WorkItemBase' component...`);
            return (<WorkItemBase
              mode={this.state.formMode}
              workItem={this.state.selectedWorkItem}
              saveWorkItem={this.saveWorkItem.bind(this)}
              metaData={WorkItemWorkspace.metaData}
              routeMatch={match}
              history={history}
            />);
          }} />
          <Route path={`${Constants.route.workItems}`} render={() => {
            // console.log(`[${this.componentName}] Loading 'WorkItemList' component...`);
            return (<WorkItemList
              selectedWorkItem={this.state.selectedWorkItem}
              routeMatch={match}
              history={history}
              workItemList={this.state.workItemList}
              metaData={WorkItemWorkspace.metaData}
              newWorkItem={this.newWorkItem.bind(this)}
              viewWorkItem={this.viewWorkItem.bind(this)}
              editWorkItem={this.editWorkItem.bind(this)}
              saveWorkItem={this.saveWorkItem.bind(this)}
              deleteWorkItem={this.deleteWorkItem.bind(this)}
              selectedWorkItemChanged={this.selectedWorkItemChanged.bind(this)}
            />);
          }} />
        </Switch>

        <UiDisplayDebugState name="state" value={this.state} />
      </div>
    );
  }
};

export default WorkItemWorkspace;
