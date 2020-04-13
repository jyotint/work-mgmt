import React from "react";
import { useField, Field } from "formik";
import UiConstants from "../../shared/uiConstants";

export const UiDateControl = ({ label, readonly, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  const controlClasses = UiConstants.classes.horizontalForm.dateControl;

  // TODO Use Date control in editable mode
  readonly = true;  // Remove this hard coded line after date control is implemented
  const readonlyAttributes = readonly ?  {"readOnly": "readOnly", "disabled": "disabled"} : {};

  return (
    <>
      <div className={controlClasses.controlGroup}>
        <label htmlFor={props.id || props.name} className={controlClasses.label}>
          {label}
        </label>
        <div className={controlClasses.control.div}>
          <Field className={controlClasses.control.control} as="input" {...field} {...props} {...readonlyAttributes} />
          {/* <ErrorMessage name={meta.name} /> */}
          {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </div>
      </div>
    </>
  );
};
