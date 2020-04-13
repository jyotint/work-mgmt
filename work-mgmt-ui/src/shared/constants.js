const Constants = {
  separator: {
    url: "/"
  },

  formMode: {
    view: "FormModeView",
    edit: "FormModeEdit"
  },

  route: {
    root: "/",
    id: "/:id",

    workItems: "/workitems",
    workItemsWithId: "/workitems/:id",

    tags: "/tags",
    categories: "/categories"
  },

  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    workItemsEndpoint: "workItems",
    categoriesEndpoint: "categories",
    tagsEndpoint: "tags",
    metaDataEndpoint: "metaData"
  },

  actions: {
    workItem: {
      SELECTED_WORKITEM: "SELECTED_WORKITEM",
      SET_WORKITEM_LIST: "SET_WORKITEM_LIST",
      GET_WORKITEM: "GET_WORKITEM",
      VIEW_WORKITEM: "VIEW_WORKITEM",
      CREATE_WORKITEM: "CREATE_WORKITEM",
      UDPATE_WORKITEM: "UDPATE_WORKITEM",
      DELETE_WORKITEM: "DELETE_WORKITEM"
    }
  }
};

export default Constants;
