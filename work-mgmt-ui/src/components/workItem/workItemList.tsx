import React from "react";
import { NavLink } from "react-router-dom";
// import { Route, Switch, NavLink, useRouteMatch } from "react-router-dom";
import { ActionArgsVoidAsync } from "../../shared/typeScriptExtension";
import { WorkItemModelList, WorkItemModelObject } from "./workItemShared";
import { WorkItemListRow } from "./workItemListRow";

const toolbarStyle = {
  backgroundColor: "#e3f2fd"
};

export interface WorkItemListProps {
  selectedWorkItem: WorkItemModelObject;
  routeMatch: any;
  history: any;
  workItemList: WorkItemModelList;
  newWorkItem: ActionArgsVoidAsync;
  viewWorkItem: ActionArgsVoidAsync;
  editWorkItem: ActionArgsVoidAsync;
  saveWorkItem: ActionArgsVoidAsync;
  deleteWorkItem: ActionArgsVoidAsync;
  selectedWorkItemChanged: any;
};
export interface WorkItemListState {};

export class WorkItemList extends React.Component<WorkItemListProps, WorkItemListState> {
  private componentName: string = "WorkItemList";

  isAnyWorkItemSelected = (): boolean => {
    const selectedWorkItemId = this.props.selectedWorkItem?.id;
    const isWorkItemSelected = selectedWorkItemId !== undefined;
    // console.debug(`[${this.componentName}] isAnyWorkItemSelected() >> ${isWorkItemSelected}, id: `, selectedWorkItemId);
    return isWorkItemSelected;
  }

  componentDidMount() {
    console.debug(`[${this.componentName}] componentDidMount()`);
  }

  newWorkItemHandler(e: any) {
    e.preventDefault();
    // this.props.newWorkItem(this.props.selectedWorkItem?.id);
  }

  viewWorkItemHandler(e: any) {
    e.preventDefault();
    this.props.history.push(`${this.props.routeMatch.url}/${this.props.selectedWorkItem?.id}?ot=view`)
    this.props.viewWorkItem(this.props.selectedWorkItem?.id);
  }

  editWorkItemHandler(e: any) {
    e.preventDefault();
    // this.props.editWorkItem(this.props.selectedWorkItem?.id);
  }

  deleteWorkItemHandler(e: any) {
    e.preventDefault();
    // TODO Prompt prior to executing a work item delete
    this.props.deleteWorkItem(this.props.selectedWorkItem?.id);
  }

  render() {
    const selectedWorkItem = this.props.selectedWorkItem;
    const selectedWorkItemId = selectedWorkItem?.id;
    const workItemList = this.props.workItemList || [];
    const routeMatch = this.props.routeMatch;
    const nothingSelected = !this.isAnyWorkItemSelected();
    // console.debug(`[${this.componentName}] render() >> Rendering >> routeMatch: `, routeMatch);
    // console.debug(`[${this.componentName}] render() >> Rendering >> workItemList: `, workItemList);

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={toolbarStyle}>
          <div className="collapse navbar-collapse" id="navbarNav">
            <NavLink
              exact
              className="nav-item nav-link btn btn-sm btn-primary disabled"
              to={`${routeMatch.url}/new`}
              onClick={(e) => this.newWorkItemHandler(e)}
            >
              New
            </NavLink>
            {nothingSelected ? null : (
              <NavLink
                exact
                className="nav-item nav-link btn btn-sm btn-primary"
                to={`${routeMatch.url}/${selectedWorkItemId}?ot=view`}
                activeClassName="active"
                onClick={(e) => this.viewWorkItemHandler(e)}
              >
                View
              </NavLink>
            )}
            {nothingSelected ? null : (
              <NavLink
                exact
                className="nav-item nav-link btn btn-sm btn-primary disabled"
                to={`${routeMatch.url}/${selectedWorkItemId}?ot=edit`}
                activeClassName="active"
                onClick={(e) => this.editWorkItemHandler(e)}
              >
                Edit
              </NavLink>
            )}
            {nothingSelected ? null : (
              <NavLink
                exact
                className="nav-item nav-link btn btn-sm btn-danger"
                to={`${routeMatch.url}/${selectedWorkItemId}?ot=delete`}
                activeClassName="active"
                onClick={(e) => this.deleteWorkItemHandler(e)}
              >
                Delete
              </NavLink>
            )}

            {/* <ul className="navbar-nav">
              <li className="nav-item active">
                <button className="btn btn-sm btn-primary" onClick={() => this.props.newWorkItem()}>
                  New
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => this.props.editWorkItem()}
                  disabled={this.isAnyWorkItemSelected()}
                >
                  Edit
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => this.props.deleteWorkItem()}
                  disabled={this.isAnyWorkItemSelected()}
                >
                  Delete
                </button>
              </li>
            </ul> */}
          </div>
        </nav>

        {/* <p>Work Items</p> */}
        <table className="table table-bordered table-striped table-hover table-sm">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Priority</th>
              <th scope="col">Assigned To</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
            </tr>
          </thead>
          <tbody>
            {workItemList.map(item => (
              <WorkItemListRow
                key={item.id}
                workItem={item}
                selectedWorkItem={selectedWorkItem}
                selectedWorkItemChanged={this.props.selectedWorkItemChanged}
              />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
