import React from "react";
import { useField, Field } from "formik";
import UiConstants from "../../shared/uiConstants";

export const UiTextAreaControl = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  const rows = props["rows"] || UiConstants.controls.textArea.defaultRows;
  const controlClasses = UiConstants.classes.horizontalForm.textAreaControl;

  return (
    <>
      <div className={controlClasses.controlGroup}>
        <label htmlFor={props.id || props.name} className={controlClasses.label}>
          {label}
        </label>
        <div className={controlClasses.control.div}>
          <Field className={controlClasses.control.control} as="textarea" rows={rows} {...field} {...props} />
          {/* <ErrorMessage name={meta.name} /> */}
          {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </div>
      </div>
    </>
  );
};
