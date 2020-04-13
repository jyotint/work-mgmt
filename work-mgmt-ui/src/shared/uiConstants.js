const UiConstants = {
  controls: {
    textArea: {
      defaultRows: 10,
    },
  },

  classes: {
    horizontalForm: {
      inputControl: {
        controlGroup: "form-group row",
        label: "col-sm-2 col-form-label col-form-label-sm text-right",
        control: {
          div: "col-sm-10",
          control: "form-control form-control-sm",
        }
      },
      buttonControl: {
        controlGroup: "form-group row",
        label: "col-sm-2 col-form-label col-form-label-sm text-right",
        control: {
          div: "col-sm-10",
          control: "btn btn-primary",
        }
      }
    }
  }
};

UiConstants.classes.horizontalForm.textAreaControl = UiConstants.classes.horizontalForm.inputControl;
UiConstants.classes.horizontalForm.dropDownControl = UiConstants.classes.horizontalForm.inputControl;
UiConstants.classes.horizontalForm.dateControl = UiConstants.classes.horizontalForm.inputControl;

export default UiConstants;
