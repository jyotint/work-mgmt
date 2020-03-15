import Constants from "../shared/constants";
import { constructUrl } from "../shared/helpers";


class WorkItemService {
  endpoint = Constants.API.WorkItemsEndpoint;

  // TODO HTTP Status Code check, throwing Error to caller
  async getAllAsync() {
    let data = [];

    try {
      const url = this.getBaseUrl();
      console.debug(`WorkItemService::getAllAsync(): "${url}"`)

      const response = await fetch(url);
      data = await response.json();
    } catch (err) {
      console.error(err);
    }

    return data;
  }

  async getAsync(id) {
    let data = {};

    try {
      const url = this.getBaseUrlWithId(id);
      console.debug(`WorkItemService::getAsync(${id}): "${url}"`)

      const response = await fetch(url);
      data = await response.json();
    } catch (err) {
      console.error(err);
    }

    return data;
  }

  async createAsync(data) {
    try {
      const url = this.getBaseUrl();
      console.debug(`WorkItemService::createAsync(): "${url}"`)

      const response = fetch(url, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.error(err);
    }
  }

  async updateAsync(id, data) {
    try {
      const url = this.getBaseUrlWithId(id);
      console.debug(`WorkItemService::updateAsync(${id}): "${url}"`)

      const response = fetch(url, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.error(err);
    }
  }

  async deleteAsync(id) {
    try {
      const url = this.getBaseUrlWithId(id);
      console.debug(`WorkItemService::deleteAsync(${id}): "${url}"`)

      const response = fetch(url, {
        method: "DELETE"
      });
    } catch (err) {
      console.error(err);
    }
  }

  getBaseUrl() {
    // console.debug(`WorkItemService::getBaseUrl(): "${constructUrl(this.endpoint)}"`)
    return constructUrl(this.endpoint);
  }

  getBaseUrlWithId(id) {
    // console.debug(`WorkItemService::getBaseUrlWithId(): "${constructUrl(this.endpoint, id)}"`)
    return constructUrl(this.endpoint, id);
  }

  getHeaders() {
    return {
      "Content-Type": "application/json"
    };
  }
}

// Create Singleton service and export it
export default new WorkItemService();
