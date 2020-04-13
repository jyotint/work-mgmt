import Constants from "../shared/constants";
import { BaseService } from "./baseService";
import { ResponseModel } from "../models/responseModel";
import { KeyValueModelList } from "../models/keyValueModel";

class MetaDataService extends BaseService {
  constructor() {
    super("MetaDataService", Constants.api.metaDataEndpoint);
  }

  async getStatusValues(): Promise<KeyValueModelList> {
    let statusMetaData: KeyValueModelList = [];
    const result: ResponseModel = await super.getAsync("status");
    if (result.isStatusSuccessful()) {
      const data = result.getData();
      statusMetaData = data.value;
    }

    return Promise.resolve(statusMetaData);
  }
}

// Create Singleton service and export it
export default new MetaDataService();
