import React from "react";
import Constants from "../../shared/constants";
import { WorkItemModel } from "../../models/workItemModel";
import { WorkItemModelObject } from "./workItemShared";

export interface WorkItemBaseProps {
  mode: any;
  workItem: WorkItemModelObject;
  routeMatch: any;
  history: any;
};
export interface WorkItemBaseState {
  workItemState: WorkItemModel
}

export class WorkItemBase extends React.Component<WorkItemBaseProps, WorkItemBaseState> {
  private componentName: string = "WorkItemBase";
  private workItem: WorkItemModel = new WorkItemModel();

  componentWillMount() {
    console.debug(`[${this.componentName}] componentWillMount()`);
  }

  async componentDidMount() {
    console.debug(`[${this.componentName}] componentDidMount()`);
  }

  componentDidUpdate() {
    console.debug(`[${this.componentName}] componentDidUpdate()`);
  }

  componentWillUnmount() {
    console.debug(`[${this.componentName}] componentWillUnmount()`);
  }

  handleFormDataChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    // console.debug(`[${this.componentName}] handleFormDataChange() >> '${name}', '${value}'.`);

    // // @ts-ignore
    // this.setState({
    //   [name]: value
    // });
    // TODO Refactor following code and make it generic
    switch(name) {
      case "name": this.workItem.name = value; break;
      case "description": this.workItem.description = value; break;
      case "status": this.workItem.status = value; break;
    }

    this.setState({workItemState: this.workItem});
  }

  handleSaveChanges = (event: any) => {
    console.debug(`[${this.componentName}] handleSaveChanges()`);
    event.preventDefault();

    this.props.history.push(Constants.Route.WorkItems);
  }

  handleCloseForm = (event: any) => {
    console.debug(`[${this.componentName}] handleSaveChanges()`);
    event.preventDefault();

    this.props.history.push(Constants.Route.WorkItems);
  }

  render() {
    this.workItem = this.props.workItem || new WorkItemModel();
    console.debug(`[${this.componentName}] render() >> Rendering >> workItem: `, this.workItem);

    // TODO Convert datetimes to local datetime

    // let formMode = this.props.mode === Constants.FormMode.Edit ? "" : "disabled";
    const formMode = this.props.mode === Constants.FormMode.View ? true : false;

    return (
      <div className="m-2">
        <div><p>Work Item Detail</p></div>
        <form onSubmit={(e) => this.handleSaveChanges(e)}>
          <fieldset disabled={formMode}>
            <div className="form-group row">
              <label htmlFor="wiId" className="col-sm-1 col-form-label col-form-label-sm">
                Id
              </label>
              <div className="col-sm-11">
                <input type="text" readOnly className="form-control form-control-sm" id="wiId" value={this.workItem.id} onChange={this.handleFormDataChange} />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="wiName" className="col-sm-1 col-form-label col-form-label-sm">
                Name
              </label>
              <div className="col-sm-11">
                <input
                  type="f"
                  className="form-control form-control-sm"
                  name="name"
                  id="wiName"
                  value={this.workItem.name}
                  onChange={this.handleFormDataChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="wiDescription" className="col-sm-1 col-form-label col-form-label-sm">
                Description
              </label>
              <div className="col-sm-11">
                <textarea
                  rows={10}
                  className="form-control form-control-sm"
                  name="description"
                  id="wiDescription"
                  value={this.workItem.description}
                  onChange={this.handleFormDataChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="wiAssignedTo" className="col-sm-1 col-form-label col-form-label-sm">
              Assigned To
              </label>
              <div className="col-sm-11">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="assignedTo"
                  id="wiAssignedTo"
                  value={this.workItem.assignedTo}
                  onChange={this.handleFormDataChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="wiStatus" className="col-sm-1 col-form-label col-form-label-sm">
                Status
              </label>
              <div className="col-sm-11">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="status"
                  id="wiStatus"
                  value={this.workItem.status}
                  onChange={this.handleFormDataChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="wiPriority" className="col-sm-1 col-form-label col-form-label-sm">
              Priority
              </label>
              <div className="col-sm-11">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="priority"
                  id="wiPriority"
                  value={this.workItem.priority}
                  onChange={this.handleFormDataChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="wiStartDate" className="col-sm-1 col-form-label col-form-label-sm">
              Start Date
              </label>
              <div className="col-sm-11">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="startDate"
                  id="wiStartDate"
                  value={this.workItem.startDate}
                  onChange={this.handleFormDataChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="wiEndDate" className="col-sm-1 col-form-label col-form-label-sm">
              End Date
              </label>
              <div className="col-sm-11">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="endDate"
                  id="wiEndDate"
                  value={this.workItem.endDate}
                  onChange={this.handleFormDataChange}
                />
              </div>
            </div>
          </fieldset>
          <div className="form-group row">
              <label htmlFor="wiSave" className="col-sm-1 col-form-label col-form-label-sm"></label>
              <div className="col-sm-11">
                <button type="submit" className="btn btn-primary" disabled={formMode}>
                  Save
                </button>
                <button type="submit" className="btn btn-primary">
                  Close
                </button>
              </div>
            </div>
        </form>
      </div>
    );
  }
}
