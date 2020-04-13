import React, { ReactElement } from "react";
import { ObjectLiteral } from "../../shared/typeScriptExtension";
import { WorkItemModel, WorkItemModelObject } from "../../models/workItemModel";
import { getValue } from "./../../shared/helpers";

export interface WorkItemListRowProps {
  workItem: WorkItemModel;
  selectedWorkItem: WorkItemModelObject;
  selectedWorkItemChanged: any;
  metaData: ObjectLiteral;
};

export const WorkItemListRow: React.FunctionComponent<WorkItemListRowProps> = (props: WorkItemListRowProps): ReactElement => {
  // console.debug(`[WorkItemListRow] render() >> Rendering...`);
  // console.debug(`[WorkItemListRow] render() >> Rendering >> workItem: `, props.workItem);

  const item: WorkItemModel = props.workItem;
  const statusDisplayValue = getValue(props.metaData.statusMetaData || [], item.status);

  // TODO Convert datetimes to local datetime

  return (
    <tr
      key={item.id}
      className={(props.selectedWorkItem?.id === item.id) ? "table-primary" : ""}
      onClick={() => props.selectedWorkItemChanged(item)}
    >
      <th scope="row">{item.id}</th>
      <td>{item.name}</td>
      <td>{statusDisplayValue}</td>
      <td>{item.priority} </td>
      <td>{item.assignedTo}</td>
      <td>{item.startDate}</td>
      <td>{item.endDate}</td>
    </tr>
  );
}
