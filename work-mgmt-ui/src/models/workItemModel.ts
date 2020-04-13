/// <reference path="baseModel.ts" />
import * as yup from "yup";
import { BaseModel, BaseModelValdiationSchema } from "./baseModel";

export class WorkItemModel extends BaseModel {
  name: string | undefined;
  description: string | undefined;
  status: string | undefined;
  priority: number | undefined;
  assignedTo: string | undefined;
  categoryId: number | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
};

const valdiationSchema = yup.object({
  name: yup.string().required().max(100),
  description: yup.string().max(1000),
  status: yup.string().required().max(20),
  priority: yup.number().min(1).max(10),
  assignedTo: yup.string().max(100),
  categoryId: yup.number(),
  startDate: yup.date(),
  endDate: yup.date()
});

export const WorkItemModelValdiationSchema = valdiationSchema.concat(BaseModelValdiationSchema);
export declare type WorkItemModelObject = WorkItemModel | undefined;
export declare type WorkItemModelList = WorkItemModel[] | undefined;
