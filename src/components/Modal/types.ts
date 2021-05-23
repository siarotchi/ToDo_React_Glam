import { ReactChild } from "react";

export interface ModalProps {
  isShowed: boolean;
  customClassName?: string;
  children: ReactChild;
}
