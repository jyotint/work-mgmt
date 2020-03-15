import React, { Fragment, Component } from "react";
import { NavLink } from "react-router-dom";
// import { Route, Switch, NavLink, useRouteMatch } from "react-router-dom";
import { WorkItemListRow } from "./workItemListRow";

const toolbarStyle = {
  backgroundColor: "#e3f2fd"
};

class WorkItemList extends Component {
  componentName = "WorkItemList";

  constructor() {
    super();
    console.debug(`[${this.componentName}] constructor()`);
  }

  isAnyWorkItemSelected = () => {
    const selectedWorkItem = this.props.selectedWorkItem;
    const selectedWorkItemId = selectedWorkItem === undefined ? -1 : selectedWorkItem.id;
    const isWorkItemSelected = selectedWorkItem === undefined ? false : (selectedWorkItemId !== undefined);
    console.debug(`[${this.componentName}] isAnyWorkItemSelected() >> ${isWorkItemSelected}, id: `, selectedWorkItemId);
    return isWorkItemSelected;
  };

  componentDidMount() {
    console.debug(`[${this.componentName}] componentDidMount()`);
  }

  render() {
    const selectedWorkItem = this.props.selectedWorkItem;
    const workItemList = this.props.workItemList || [];
    const routeMatch = this.props.routeMatch;
    const nothingSelected = !this.isAnyWorkItemSelected();
    console.debug(`[${this.componentName}] render() >> Rendering >> routeMatch: `, routeMatch);
    console.debug(`[${this.componentName}] render() >> Rendering >> workItemList: `, workItemList);

    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={toolbarStyle}>
          <div className="collapse navbar-collapse" id="navbarNav">
            <NavLink
              exact
              className="nav-item nav-link btn btn-sm btn-primary"
              to={`${routeMatch.url}/new`}
              onClick={() => this.props.newWorkItem()}
            >
              New
            </NavLink>
            {nothingSelected ? null : (
              <NavLink
                exact
                className="nav-item nav-link btn btn-sm btn-primary"
                to={`${routeMatch.url}/${selectedWorkItem.id}/view`}
                activeClassName="active"
              >
                View
              </NavLink>
            )}
            {nothingSelected ? null : (
              <NavLink
                exact
                className="nav-item nav-link btn btn-sm btn-primary"
                to={`${routeMatch.url}/${selectedWorkItem.id}/edit`}
                activeClassName="active"
              >
                Edit
              </NavLink>
            )}
            {nothingSelected ? null : (
              <NavLink
                exact
                className="nav-item nav-link btn btn-sm btn-danger"
                to={`${routeMatch.url}/${selectedWorkItem.id}/delete`}
                activeClassName="active"
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
      </Fragment>
    );
  }
}

export default WorkItemList;
