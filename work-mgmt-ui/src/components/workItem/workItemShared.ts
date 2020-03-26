import { WorkItemModel } from "../../models/workItemModel";

export declare type WorkItemModelObject = WorkItemModel | undefined;
export declare type WorkItemModelList = WorkItemModel[] | undefined;

export enum WorkItemWorkspaceViewState {
  None = 1,
  ShowList = 2,
  ShowObject = 3
};
