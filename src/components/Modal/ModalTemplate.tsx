import * as React from "react";
import { css } from "glamor";
import { ModalProps } from "./types";

const style = css({
  position: "absolute",
  display: "block",
  zIndex: 10,
  width: "100%",
  height: "100vh",
  backgroundColor: "rgba(245, 246, 250, 0.8)",
  transition: "opacity 0.3s ease-in-out",

  "& .modal-content": {
    position: "relative",
    display: "block",
    width: 350,
    padding: "25px 25px 30px",
    margin: "0 auto",
    marginTop: "30vh",
    borderRadius: 10,
    boxShadow:
      "0 2px 4px 0 rgba(153, 182, 208, 0.1), 0 10px 30px 0 rgba(100, 121, 141, 0.1)",
    backgroundColor: "#fefeff"
  },

  "&.showed": {
    pointerEvents: "auto",
    opacity: 1
  },

  "&.hidden": {
    opacity: 0,
    pointerEvents: "none"
  }
});

const ModalTemplate = ({
  isShowed = false,
  customClassName,
  children
}: ModalProps) => {
  const removeOpenedModalClass = (body: HTMLElement) => {
    if (body.classList.contains("modalOpened")) {
      body.classList.remove("modalOpened");
    }
  };

  React.useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    if (isShowed) {
      body.classList.add("modalOpened");
    } else {
      removeOpenedModalClass(body);
    }

    return () => removeOpenedModalClass(body);
  }, [isShowed]);

  return (
    <div
      className={`modal-wrapper 
      ${style} ${customClassName ? customClassName : ""}
      ${isShowed ? "showed" : "hidden"}`}
    >
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default ModalTemplate;
