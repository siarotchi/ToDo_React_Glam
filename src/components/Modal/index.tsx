import * as React from "react";
import * as ReactDOM from "react-dom";
import { ModalProps } from "./types";
import ModalTemplate from "./ModalTemplate";

const modalRoot = document.getElementById("modal-root");

const Modal = (props: ModalProps) =>
  ReactDOM.createPortal(<ModalTemplate {...props} />, modalRoot);

export default Modal;
