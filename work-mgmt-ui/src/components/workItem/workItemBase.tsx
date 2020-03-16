import React from "react";
import Constants from "../../shared/constants";
import { WorkItemModel } from "../../models/workItemModel";

export interface WorkItemBaseProps {
  workItem: WorkItemModel;
  history: any;
  mode: any;
};
export interface WorkItemBaseState {
  id: number;
  name: string;
  description: string;
  status: string;

  initialized: boolean;
};

export class WorkItemBase extends React.Component<WorkItemBaseProps, WorkItemBaseState> {
  private componentName: string = "WorkItemBase";
  private workItem: WorkItemModel | undefined;
  state: WorkItemBaseState = {
    id: -1,
    name: "",
    description: "",
    status: "",

    initialized: false
  };

  // constructor(props: WorkItemBaseProps, state: WorkItemBaseState) {
  //   super(props, state);
  //   this.workItem = new WorkItem();
  // }

  componentWillMount() {
    console.debug(`[${this.componentName}] componentWillMount()`);
  };

  componentDidMount() {
    console.debug(`[${this.componentName}] componentDidMount()`, this.props.workItem);
    this.workItem = this.props.workItem;
    // const { id, name, description, status } = this.props.workItem;
  };

  componentDidUpdate() {
    console.debug(`[${this.componentName}] componentDidUpdate()`);
  };

  componentWillUnmount() {
    console.debug(`[${this.componentName}] componentWillUnmount()`);
  };


  handleFormDataChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    console.debug(`[${this.componentName}] handleFormDataChange() >> '${name}', '${value}'.`);
    // @ts-ignore
    this.setState({ [name]: value });
  };

  handleSaveChanges = (event: any) => {
    console.debug(`[${this.componentName}] handleSaveChanges()`);

    event.preventDefault();
    // FIXME Remove hardcoding
    this.props.history.push("/workitem");
  };

  render() {
    this.workItem = this.workItem || new WorkItemModel();
    console.debug(`[${this.componentName}] render() >> Rendering >> workItem: `, this.workItem);

    // TODO Convert datetimes to local datetime
    let formMode = this.props.mode === Constants.FormMode.Edit ? "" : "disabled";

    return (
      <div>
        <p>Work Item Detail</p>
        <form onSubmit={(e) => this.handleSaveChanges(e)}>
          <fieldset disabled={formMode === Constants.FormMode.View}>
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
                  type="text"
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
              <label htmlFor="wiSave" className="col-sm-1 col-form-label col-form-label-sm"></label>
              <div className="col-sm-11">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
