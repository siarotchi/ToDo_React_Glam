import * as React from "react";
import { Form, Field, ErrorMessage } from "formik";
import TimeField from "react-simple-timefield";

interface Props {
  changeScreen: () => void;
  values: any;
  activeIndex: number | undefined;
  setFieldValue: (string, any) => void;
  resetForm: () => void;
  toggleActive: () => void;
}

const FormikView = ({
  changeScreen,
  values,
  setFieldValue,
  resetForm,
  toggleActive,
  activeIndex
}: Props) => {
  const renderText = (activeIndex: number | undefined) =>
    activeIndex ? "Edit" : "Add";

  return (
    <div className="create-todo">
      <div className="create-todo-header">
        <span
          className="back-icon"
          onClick={() => {
            resetForm();
            changeScreen();
            toggleActive();
          }}
        >
          <svg viewBox="0 0 31.494 31.494">
            <path
              fill="#3ECEFF"
              d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554
              c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587
              c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z"
            />
          </svg>
        </span>
        <span className="header-title">
          {renderText(activeIndex)} your todo item
        </span>
      </div>
      <div className="create-todo-form">
        <Form>
          <div className="form-field">
            <Field
              type="text"
              name="todoTitle"
              placeholder="Title"
              className="default-field"
            />
            <ErrorMessage
              name="todoTitle"
              component="div"
              className="error-field"
            />
          </div>
          <TimeField
            onChange={time => setFieldValue("time", time)}
            value={values.time}
            input={
              <input
                type="text"
                name="time"
                placeholder="Time"
                className="default-field"
              />
            }
          />
          <div className="form-field">
            <Field
              type="text"
              name="todoDescription"
              placeholder="Description"
              className="default-field"
              component="textarea"
            />
            <ErrorMessage
              name="todoDescription"
              component="div"
              className="error-field"
            />
          </div>
          <button className="add-todo-button" type="submit">
            <span>{renderText(activeIndex)} todo item</span>
          </button>
        </Form>
      </div>
    </div>
  );
};

export default FormikView;
