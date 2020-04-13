# Work Management application

**Technologies Used:** JavaScript, TypeScript, Node JS, React v16, Docker, Docker-Compose

Status: In Development.

## Overview

Application to create and manage work items.

**Added feature list:**

1. Git Branch: "feature/001-base-application-setup"
    1. Created basic application shell and application
    2. Added components, services and shared functions/classes
    3. Added navigation using react-router
    4. Added REST API for data
2. Git Branch: "feature/002-typescript-support"
    1. Added TypeScript support
        1. Created model classes
        2. Converted all WorkItem components to TypeScript
        3. Converted all Services to TypeScript
    2. Migrate rest of components over next few iterations
3. Git Branch: "feature/003-workitem-crud-ops"
    1. Added ResponseModel for Services and refactored existing serivces
    2. Implemented delete work item
    3. Added view WorkItem details view
    4. Implemented heirarchical routing for WorkItem workspace
    5. Refactored other workspaces
    6. Pending - New and Edit WorkItem
4. Git Branch: "feature/004-formik-form-mgmt"
    1. Ported WorkItemBase to use [Formik](https://jaredpalmer.com/formik/) (Build forms in React)
    2. Converted "WorkItemList" and "WorkItemListRow" to React Function Component
    3. Created meta data service for Work Item Status
    4. Created UI Control Component for Input, TextArea and DropDown
    5. Created UI Constants for usage by control components

**Steps to run the application:**

1. Create ".env" file in "work-mgmt-ui" folder with following environment variables (shown with example)
    1. Port on which UI application will run

        ```PORT=4001```

    2. Base URL for API

        ```REACT_APP_API_BASE_URL="http://localhost:6001"```

2. Run following command to start the application 

    ```npm start```
