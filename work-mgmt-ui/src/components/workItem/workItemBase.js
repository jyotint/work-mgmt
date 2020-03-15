import React, { Component } from "react";
import Constants from "../../shared/constants";

class WorkItemBase extends Component {
  componentName = "WorkItemBase";
  workItem = {};
  state = {
    id: -1,
    name: "",
    description: "",
    status: "",

    initialized: false
  };

  static getDerivedStateFromProps(props, state) {
    console.debug(`[WorkItemBase] getDerivedStateFromProps()`);

    let value;
    if(!state.initialized) {
      value = {
        ...props,
        initialized: true
      };
    }
    else {
      value = null;
    }

    console.debug(`[WorkItemBase] getDerivedStateFromProps()`, value);
    return value;
  };

  // "componentWillMount" is legacy method when used in conjunction with "getDerivedStateFromProps"
  // componentWillMount() {
  //   console.debug(`[${this.componentName}] componentWillMount()`);
  // };

  componentDidMount() {
    console.debug(`[${this.componentName}] componentDidMount()`, this.props.workItem);
    this.workItem = this.props.workItem;
    // const { id, name, description, status } = this.props.workItem;
  };

  // componentDidUpdate() {
  //   console.debug(`[${this.componentName}] componentDidUpdate()`);
  // };

  componentWillUnmount() {
    console.debug(`[${this.componentName}] componentWillUnmount()`);
  };


  handleFormDataChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    console.debug(`[${this.componentName}] handleFormDataChange() >> '${name}', '${value}'.`);
    this.setState({ [name]: value });
  };

  handleSaveChanges = event => {
    console.debug(`[${this.componentName}] handleSaveChanges()`);

    event.preventDefault();
    this.props.history.push("/workitem");
  };

  render() {
    console.debug(`[${this.componentName}] render() >> Rendering >> workItem: `, this.workItem);

    // TODO Convert datetimes to local datetime
    let formMode = this.props.mode === Constants.FormMode.Edit ? "" : "disabled";

    return (
      <div>
        <p>Work Item Detail</p>
        <form onSubmit={() => this.handleSaveChanges()}>
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
                  rows="10"
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

export default WorkItemBase;
