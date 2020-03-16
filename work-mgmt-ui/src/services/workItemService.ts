import Constants from "../shared/constants";
import { WorkItemModel } from "./../models/workItemModel";
import { BaseService } from "./baseService";

class WorkItemService extends BaseService {
  constructor() {
    super("WorkItemService", Constants.API.WorkItemsEndpoint);
  }

  async createAsync(data: WorkItemModel) {
    try {
      const url = this.getBaseUrl();
      console.debug(`${this.serviceName}::createAsync(): "${url}"`)

      // const response = fetch(url, {
      fetch(url, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.error(err);
    }
  }

  async updateAsync(id: string, data: WorkItemModel) {
    try {
      const url = this.getBaseUrlWithId(id);
      console.debug(`${this.serviceName}::updateAsync(${id}): "${url}"`)

      // const response = fetch(url, {
      fetch(url, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.error(err);
    }
  }

  async deleteAsync(id: string) {
    try {
      const url = this.getBaseUrlWithId(id);
      console.debug(`${this.serviceName}::deleteAsync(${id}): "${url}"`)

      // const response = fetch(url, {
      fetch(url, {
        method: "DELETE"
      });
    } catch (err) {
      console.error(err);
    }
  }
}

// Create Singleton service and export it
export default new WorkItemService();
