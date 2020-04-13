import * as yup from "yup";

export class KeyValueModel {
  key: string | undefined;
  value: string | undefined;
};

export const KeyValueModelValdiationSchema = yup.object({
  key: yup.string().required().max(100),
  value: yup.string().required().max(255)
});

export declare type KeyValueModelList = KeyValueModel[];
