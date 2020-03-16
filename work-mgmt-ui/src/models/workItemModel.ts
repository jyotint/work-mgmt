/// <reference path="baseModel.ts" />
import { BaseModel } from "./baseModel";

export class WorkItemModel extends BaseModel {
  name: string | undefined;
  description: string | undefined;
  priority: number | undefined;
  status: string | undefined;
  assignedTo: string | undefined;
  categoryId: number | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
}
