import Constants from "../shared/constants";
import { WorkItemModel } from "./../models/workItemModel";
import { BaseService } from "./baseService";
import { ResponseModel } from "../models/responseModel";

class WorkItemService extends BaseService {
  constructor() {
    super("WorkItemService", Constants.api.workItemsEndpoint);
  }

  async createAsync(data: WorkItemModel): Promise<ResponseModel> {
    let result: ResponseModel;

    try {
      const url = this.getBaseUrl();
      console.debug(`${this.serviceName}::createAsync(): "${url}"`)

      // const response = fetch(url, {
      const response = await fetch(url, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });

      result = new ResponseModel(0, undefined, undefined);
    } catch (err) {
      console.error(err);
      result = new ResponseModel(0, err, undefined);
    }

    return result;
  }

  async updateAsync(id: string, data: WorkItemModel): Promise<ResponseModel> {
    let result: ResponseModel;

    try {
      const url = this.getBaseUrlWithId(id);
      console.debug(`${this.serviceName}::updateAsync(${id}): "${url}"`)

      // const response = fetch(url, {
      const response = await fetch(url, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });

      result = new ResponseModel(0, undefined, undefined);
    } catch (err) {
      result = new ResponseModel(0, err, undefined);
    }

    console.debug("23");
    return result;
  }

  async deleteAsync(id: string): Promise<ResponseModel> {
    let result: ResponseModel;

    try {
      const url = this.getBaseUrlWithId(id);
      console.debug(`${this.serviceName}::deleteAsync(${id}): "${url}"`)

      // const response = fetch(url, {
      const response = await fetch(url, {
        method: "DELETE"
      });

      result = new ResponseModel(0, undefined, undefined);
    } catch (err) {
      console.error(err);
      result = new ResponseModel(0, err, undefined);
    }

    return result;
  }
}

// Create Singleton service and export it
export default new WorkItemService();
