import Constants from "../shared/constants";

export class BaseService {
  protected serviceName: string = "WorkItemService";
  protected serviceEndpoint: string;

  constructor(serviceName: string, serviceEndpoint: string) {
    this.serviceName = serviceName;
    this.serviceEndpoint = serviceEndpoint;
  }

  // TODO HTTP Status Code check, throwing Error to caller

  async getAllAsync() {
    let data = [];

    try {
      const url = this.getBaseUrl();
      console.debug(`${this.serviceName}::getAllAsync(): "${url}"`)

      const response = await fetch(url);
      data = await response.json();
    } catch (err) {
      console.error(err);
    }

    return data;
  }

  async getAsync(id: string) {
    let data = {};

    try {
      const url = this.getBaseUrlWithId(id);
      console.debug(`${this.serviceName}::getAsync(${id}): "${url}"`)

      const response = await fetch(url);
      data = await response.json();
    } catch (err) {
      console.error(err);
    }

    return data;
  }

  constructUrl(endpoint: string, id?: string): string {
    return id === undefined
      ? `${Constants.API.BaseUrl}${Constants.Separator.URL}${endpoint}`
      : `${Constants.API.BaseUrl}${Constants.Separator.URL}${endpoint}${Constants.Separator.URL}${id}`;
  }

  getBaseUrl() {
    // console.debug(`WorkItemService::getBaseUrl(): "${constructUrl(this.endpoint)}"`)
    return this.constructUrl(this.serviceEndpoint);
  }

  getBaseUrlWithId(id: string) {
    // console.debug(`WorkItemService::getBaseUrlWithId(): "${constructUrl(this.endpoint, id)}"`)
    return this.constructUrl(this.serviceEndpoint, id);
  }

  getHeaders() {
    return {
      "Content-Type": "application/json"
    };
  }
}
