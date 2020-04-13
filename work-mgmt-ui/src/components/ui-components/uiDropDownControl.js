import React from "react";
import { useField, Field } from "formik";
import UiConstants from "../../shared/uiConstants";

export const UiDropDownControl = ({ label, metaData, readonly, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  const readonlyAttributes = readonly ?  {"readOnly": "readOnly", "disabled": "disabled"} : {};
  const controlClasses = UiConstants.classes.horizontalForm.dropDownControl;

  return (
    <>
      <div className={controlClasses.controlGroup}>
        <label htmlFor={props.id || props.name} className={controlClasses.label}>
          {label}
        </label>
        <div className={controlClasses.control.div}>
          {(
            <>
              <Field className={controlClasses.control.control} as="select" {...field} {...props} {...readonlyAttributes}>
                {(metaData || []).map((item) => (
                  <option key={item.key} value={item.key}>{item.value}</option>
                ))}
              </Field>
              {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
            </>
          )}
        </div>
      </div>
    </>
  );
};
