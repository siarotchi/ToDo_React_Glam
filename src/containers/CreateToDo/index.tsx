import * as React from "react";
import { Formik } from "formik";
import FormikView from "./LocalComponents/FormikView";
import uuid from "uuid";

interface Props {
  todoList: Array<{
    id: string;
    time: any;
    title: string;
    done: boolean;
    description: string;
  }>;
  activeIndex: number;
  changeScreen: (val: boolean) => void;
  addTodoItem: (
    id: string,
    time: any,
    title: string,
    done: boolean,
    description: string
  ) => void;
  editTodoItem: (
    index: number,
    title: string,
    time: any,
    description: string
  ) => void;
  toggleActive: (any) => void;
}

const isUndefined = (value: string) => value === undefined;

const required = (value: string) => value.length === 0;

const min = (value: string, len: number) => value.length < len;

const max = (value: string, len: number) => value.length > len;

class CreateToDo extends React.Component<Props> {
  validate = (values: any) => {
    let errors: any = {};
    if (!isUndefined(values.todoTitle)) {
      if (min(values.todoTitle, 2)) {
        errors.todoTitle = "Min 2 characters";
      }

      if (max(values.todoTitle, 40)) {
        errors.todoTitle = "Max 40 characters";
      }

      if (required(values.todoTitle)) {
        errors.todoTitle = "Todo title is required";
      }
    }

    if (!isUndefined(values.todoDescription)) {
      if (values.todoDescription.length > 0) {
        if (min(values.todoDescription, 2)) {
          errors.todoDescription = "Min 2 characters";
        }

        if (max(values.todoDescription, 200)) {
          errors.todoDescription = "Max 200 characters";
        }

        if (required(values.todoDescription)) {
          errors.todoDescription = "Todo descrption is required";
        }
      }
    }

    return errors;
  };

  render() {
    const {
      changeScreen,
      addTodoItem,
      editTodoItem,
      activeIndex,
      todoList,
      toggleActive
    } = this.props;

    const initialValues =
      activeIndex !== undefined
        ? {
            todoTitle: todoList[activeIndex].title,
            time: todoList[activeIndex].time,
            todoDescription: todoList[activeIndex].description
          }
        : {
            todoTitle: "",
            time: "06:00",
            todoDescription: ""
          };
    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validate={values => this.validate(values)}
        onSubmit={(values, actions) => {
          if (activeIndex !== undefined) {
            editTodoItem(
              activeIndex,
              values.time,
              values.todoTitle,
              values.todoDescription
            );
            actions.resetForm();
            changeScreen(false);
            toggleActive(undefined);
            return null;
          }
          addTodoItem(
            uuid.v4(),
            values.time,
            values.todoTitle,
            false,
            values.todoDescription
          );
          actions.resetForm();
          changeScreen(false);
        }}
        render={props => (
          <FormikView
            activeIndex={activeIndex}
            changeScreen={() => changeScreen(false)}
            toggleActive={() => toggleActive(undefined)}
            {...props}
          />
        )}
      />
    );
  }
}

export default CreateToDo;
