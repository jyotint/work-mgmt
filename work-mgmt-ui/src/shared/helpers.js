import Constants from "./constants";

function constructUrl(endpoint, id) {
  return id === undefined
    ? `${Constants.API.BaseUrl}${Constants.Separator.URL}${endpoint}`
    : `${Constants.API.BaseUrl}${Constants.Separator.URL}${endpoint}${Constants.Separator.URL}${id}`;
}

export { constructUrl };
