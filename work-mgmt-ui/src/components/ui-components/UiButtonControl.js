import React from "react";
import { useField } from "formik";
import UiConstants from "../../shared/uiConstants";

export const UiButtonControl = ({ label, disabled, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field] = useField(props);
  const readonlyAttributes = disabled ?  {"disabled": "disabled"} : {};
  const controlClasses = UiConstants.classes.horizontalForm.buttonControl;

  return (
    <>
      <div className={controlClasses.controlGroup}>
        <label htmlFor={props.id || props.name} className={controlClasses.label}>
        </label>
        <div className={controlClasses.control.div}>
          <button className={controlClasses.control.control} type="submit" {...field} {...props} {...readonlyAttributes}>
            {label}
          </button>
        </div>
      </div>
    </>
  );
};
