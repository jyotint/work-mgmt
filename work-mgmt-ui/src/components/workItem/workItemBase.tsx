import React from "react";
import { Formik, Form } from "formik";
import Constants from "../../shared/constants";
import { ObjectLiteral, ActionArgsVoidAsync } from "../../shared/typeScriptExtension";
import { WorkItemModel, WorkItemModelObject, WorkItemModelValdiationSchema } from "../../models/workItemModel";
import { UiDisplayDebugState } from "../ui-components/uiDisplayDebugState";
import { UiTextInputControl } from "../ui-components/uiTextInputControl";
import { UiTextAreaControl } from "../ui-components/uiTextAreaControl";
import { UiDropDownControl } from "../ui-components/uiDropDownControl";
import { UiDateControl } from "../ui-components/UiDateControl";
import { UiButtonControl } from "../ui-components/UiButtonControl";

export interface WorkItemBaseProps {
  mode: any;
  workItem: WorkItemModelObject;
  saveWorkItem: ActionArgsVoidAsync;
  metaData: ObjectLiteral;
  routeMatch: any;
  history: any;
};
export interface WorkItemBaseState {
  workItemState: WorkItemModel
};

export class WorkItemBase extends React.Component<WorkItemBaseProps, WorkItemBaseState> {
  private componentName: string = "WorkItemBase";

  state: WorkItemBaseState = {
    workItemState: new WorkItemModel()
  }

  componentDidMount = () => {
    console.debug(`[${this.componentName}] componentDidMount()`);
    // this.setState({ workItemState: this.props.workItem || new WorkItemModel() });
  }

  handleSaveChanges = (data: any) => {
    console.debug(`[${this.componentName}] handleSaveChanges() data: `, data);
    this.props.saveWorkItem(this.props.workItem?.id, data);
  }

  render() {
    console.debug(`[${this.componentName}] render() >> Rendering...`);
    // console.debug(`[${this.componentName}] render() >> Rendering >> props.workItem: `, this.props.workItem);
    // console.debug(`[${this.componentName}] render() >> Rendering >> props.metaData.statusMetaData: `, this.props.metaData.statusMetaData);

    // TODO Convert datetimes to local datetime

    const isReadOnlyForm: boolean = this.props.mode === Constants.formMode.view ? true : false;
    // const isReadOnlyForm: boolean = false;  // For Testing only
    // console.debug(this.props.mode, isReadOnlyForm, !isReadOnlyForm);

    return (
      <div className="m-2">
        <div><p>Work Item Detail</p></div>
        <Formik
          enableReinitialize={true}
          initialValues={ {...this.props.workItem} }
          validationSchema={WorkItemModelValdiationSchema}
          onSubmit={this.handleSaveChanges}>
          {({ values, dirty, touched }) => (
            <Form>
              <fieldset disabled={isReadOnlyForm}>
                <UiTextInputControl label="Id" name="id" readOnly></UiTextInputControl>
                <UiTextInputControl label="Name" name="name"></UiTextInputControl>
                <UiDropDownControl label="Status" name="status" readonly={isReadOnlyForm} metaData={this.props.metaData.statusMetaData}></UiDropDownControl>
                <UiTextInputControl label="Priority" name="priority"></UiTextInputControl>
                {/* <UiTextInputControl label="Category Id" name="categoryId"></UiTextInputControl> */}
                <UiTextInputControl label="Assigned To" name="assignedTo"></UiTextInputControl>
                <UiDateControl label="State Date" name="startDate" readonly={isReadOnlyForm}></UiDateControl>
                <UiDateControl label="End Date" name="endDate" readonly={isReadOnlyForm}></UiDateControl>
                <UiTextAreaControl label="Description" name="description" rows={5}></UiTextAreaControl>
                <UiButtonControl label="Save" disabled={!dirty} />
              </fieldset>
              <UiDisplayDebugState name="values" state={values} />
              <UiDisplayDebugState name="props" state={this.props} />
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
