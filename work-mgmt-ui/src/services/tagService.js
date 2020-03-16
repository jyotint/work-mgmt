import { BaseService } from "./baseService";
import Constants from "../shared/constants";

class TagService extends BaseService {
  constructor() {
    super("TagService", Constants.API.TagsEndpoint);
  }
}

// Create Singleton service and export it
export default new TagService();
