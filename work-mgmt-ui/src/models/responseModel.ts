
export class ResponseModel {
  status: number = -99999;
  error!: any;
  data!: any;

  constructor(status: number, error: any, data: any) {
    // Can't use following syntax, as status of "0" is success, which is falsy in JavaScript
    // this.status = status || -99999;
    this.status = (status === undefined) ? -99999 : status;
    this.error = error;
    this.data = data;
  }

  isStatusSuccessful(): boolean {
    return this.status === 0;
  }

  isStatusFailed(): boolean {
    return this.status !== 0;
  }

  getStatus(): number {
    return this.status;
  }
  getError(): any {
    return this.error;
  }
  getData(): any {
    return this.data;
  }

  getDataObject<T>(): T {
    return this.data as T;
  }
  getDataList<T>(): T[] {
    return this.data as T[];
  }
};

export declare type ResponseModelObject = ResponseModel | undefined;
