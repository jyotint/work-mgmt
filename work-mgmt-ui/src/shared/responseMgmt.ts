import { ResponseModel } from "../models/responseModel";

export class ResponseMgmt {
  constructResponseBody(responseStatus: number, error: any, data: any): ResponseModel {
    return new ResponseModel(responseStatus, error, data);
  }

  getStatus(response: ResponseModel): number {
    return (response === undefined) ? -99998 : response.status;
  }
  getError(response: ResponseModel): any {
    // return (response === undefined) ? undefined : response.error;
    return response?.error;
  }
  getData(response: ResponseModel): any {
    // return (response === undefined) ? undefined : response.data;
    return response?.data;
  }
}
