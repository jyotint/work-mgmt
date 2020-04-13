import * as yup from "yup";

export class BaseModel {
  id: string | undefined;
  deleted: boolean | undefined;
  createdBy: string | undefined;
  createdOn: string | undefined;
  modifiedBy: string | undefined;
  modifiedOn: string | undefined;
};

export const BaseModelValdiationSchema = yup.object({
  id: yup.string().required().max(100),
  deleted: yup.boolean().required(),
  createdBy: yup.string().max(100),
  createdOn: yup.date(),
  modifiedBy: yup.string().max(100),
  modifiedOn: yup.date()
});
