import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { ActionArgsVoidAsync, ObjectLiteral } from "../../shared/typeScriptExtension";
import { WorkItemModelObject, WorkItemModelList } from "../../models/workItemModel";
import { WorkItemListRow } from "./workItemListRow";

const toolbarStyle = {
  backgroundColor: "#e3f2fd"
};

export interface WorkItemListProps {
  selectedWorkItem: WorkItemModelObject;
  routeMatch: any;
  history: any;
  workItemList: WorkItemModelList;
  metaData: ObjectLiteral;
  newWorkItem: ActionArgsVoidAsync;
  viewWorkItem: ActionArgsVoidAsync;
  editWorkItem: ActionArgsVoidAsync;
  saveWorkItem: ActionArgsVoidAsync;
  deleteWorkItem: ActionArgsVoidAsync;
  selectedWorkItemChanged: any;
};

export const WorkItemList: React.FunctionComponent<WorkItemListProps> = (props: WorkItemListProps): ReactElement => {
  // console.debug(`[WorkItemList] render() >> Rendering...`);
  const selectedWorkItemId = props.selectedWorkItem?.id;
  const workItemList = props.workItemList || [];

  const baseUrl: string = props.routeMatch.url;
  const newObjectUrl: string = `${baseUrl}/new`;
  const viewObjectUrl: string = `${baseUrl}/${selectedWorkItemId}?ot=view`;
  const editObjectUrl: string = `${baseUrl}/${selectedWorkItemId}?ot=edit`;
  const deleteObjectUrl: string = `${baseUrl}/${selectedWorkItemId}?ot=delete`;
  const nothingSelected: boolean = selectedWorkItemId === undefined;
  // console.debug(`[WorkItemList] render() >> Rendering >> workItemList: `, workItemList);

  return (
    <React.Fragment >
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={toolbarStyle}>
        <div className="collapse navbar-collapse" id="navbarNav">
          <NavLink
            exact
            className="nav-item nav-link btn btn-sm btn-primary disabled"
            to={newObjectUrl}
            onClick={(e) => props.newWorkItem(e)}
          >
            New
            </NavLink>
          {nothingSelected ? null : (
            <NavLink
              exact
              className="nav-item nav-link btn btn-sm btn-primary"
              to={viewObjectUrl}
              activeClassName="active"
              onClick={(e) => {e.preventDefault(); props.viewWorkItem(selectedWorkItemId);}}
            >
              View
            </NavLink>
          )}
          {nothingSelected ? null : (
            <NavLink
              exact
              className="nav-item nav-link btn btn-sm btn-primary"
              to={editObjectUrl}
              activeClassName="active"
              onClick={(e) => {e.preventDefault(); props.editWorkItem(selectedWorkItemId)}}
            >
              Edit
            </NavLink>
          )}
          {nothingSelected ? null : (
            <NavLink
              exact
              className="nav-item nav-link btn btn-sm btn-danger"
              to={deleteObjectUrl}
              activeClassName="active"
              onClick={(e) => {e.preventDefault(); props.deleteWorkItem(selectedWorkItemId);}}
            >
              Delete
            </NavLink>
          )}

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
              selectedWorkItem={props.selectedWorkItem}
              selectedWorkItemChanged={props.selectedWorkItemChanged}
              metaData={props.metaData}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment >
  );
}
