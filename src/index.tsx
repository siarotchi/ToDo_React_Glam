import * as React from "react";
import { render } from "react-dom";
import ToDoApp from "./containers";

import "./styles.scss";

function App() {
  return (
    <div className="App">
      <ToDoApp />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
