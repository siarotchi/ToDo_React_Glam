import * as React from "react";

interface Props {
  changeScreen: (val: boolean) => void;
}

const AddToDoItem = ({ changeScreen }: Props) => (
  <div className="add-todo-item">
    <div className="add-item-button" onClick={() => changeScreen(true)} />
  </div>
);

export default AddToDoItem;
