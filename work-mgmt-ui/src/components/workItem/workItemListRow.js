import React, { Component } from "react";

class WorkItemListRow extends Component {
  componentName = "WorkItemListRow";

  selectedWorkItemChanged = selectedWorkItem => {
    console.debug(`[${this.componentName}] selectedWorkItemChanged() >> id: ${selectedWorkItem.id}`);
    this.props.selectedWorkItemChanged(selectedWorkItem);
  };

  shouldHighlightCurrentWorkItem = currentWorkItem => {
    // console.debug(`[${this.componentName}] shouldHighlightCurrentWorkItem()`);
    // console.debug(`[${this.componentName}] shouldHighlightCurrentWorkItem()`, this);
    // console.debug(`[${this.componentName}] shouldHighlightCurrentWorkItem()`, currentWorkItem);
    return this.props.selectedWorkItem.id === currentWorkItem.id;
  };

  render() {
    let item = this.props.workItem;
    console.debug(`[${this.componentName}] render() >> Rendering...`);
    // console.debug(`[${this.componentName}] render() >> Rendering >> WorkItem: `, item);

    // TODO Convert datetimes to local datetime
    return (
      <tr
        key={item.id}
        className={this.shouldHighlightCurrentWorkItem(item) ? "table-primary" : ""}
        onClick={() => this.selectedWorkItemChanged(item)}
      >
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>{item.status}</td>
        <td>{item.priority} </td>
        <td>{item.assignedTo}</td>
        <td>{item.startDate}</td>
        <td>{item.endDate}</td>
      </tr>
    );
  }
}

export { WorkItemListRow };
