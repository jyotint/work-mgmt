import Constants from "../shared/constants";
import { ResponseModel } from "../models/responseModel";

export class BaseService {
  protected serviceName: string = "WorkItemService";
  protected serviceEndpoint: string;

  constructor(serviceName: string, serviceEndpoint: string) {
    this.serviceName = serviceName;
    this.serviceEndpoint = serviceEndpoint;
  }

  // TODO HTTP Status Code check, throwing Error to caller

  async getAllAsync(): Promise<ResponseModel> {
    let result: ResponseModel;

    try {
      const url = this.getBaseUrl();
      console.debug(`${this.serviceName}::getAllAsync(): "${url}"`)

      const response = await fetch(url);
      const data = await response.json();
      result = new ResponseModel(0, undefined, data);
    } catch (err) {
      console.error(err);
      result = new ResponseModel(-1, err, undefined)
    }

    return result;
  }

  async getAsync(id: string): Promise<ResponseModel> {
    let result: ResponseModel;

    try {
      const url = this.getBaseUrlWithId(id);
      console.debug(`${this.serviceName}::getAsync(${id}): "${url}"`)

      const response = await fetch(url);
      const data = await response.json();
      result = new ResponseModel(0, undefined, data);
    } catch (err) {
      console.error(err);
      result = new ResponseModel(-1, err, undefined)
    }

    return result;
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
