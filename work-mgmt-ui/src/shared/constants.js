const Constants = {
  Separator: {
    URL: "/"
  },

  FormMode: {
    View: "FormModeView",
    Edit: "FormModeEdit"
  },

  Route: {
    Root: "/",
    Id: "/:id",

    WorkItems: "/workitems",
    WorkItemsWithId: "/workitems/:id",

    Tags: "/tags",
    Categories: "/categories"
  },

  API: {
    BaseUrl: process.env.REACT_APP_API_BASE_URL,
    WorkItemsEndpoint: "workItems",
    CategoriesEndpoint: "categories",
    TagsEndpoint: "tags"
  },

  Actions: {
    WorkItem: {
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
