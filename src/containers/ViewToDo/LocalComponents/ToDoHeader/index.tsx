import * as React from "react";
import moment from "moment";

const ToDoHeader = () => {
  const timeNow = moment.now();
  return (
    <div className="todo-header">
      <span className="header-title">
        {moment(timeNow).format("D MMMM")}, {moment(timeNow).format("dddd")}
      </span>
    </div>
  );
};

export default ToDoHeader;
