import styles from "./ReactPortal.module.css";
import * as React from "react";
import { createPortal } from "react-dom";

const PORTAL_WRAPPER_ID = "react-portal-modal-container";

export interface ReactPortalProps {
  children: JSX.Element;
}

export const ReactPortal: React.FunctionComponent<ReactPortalProps> = (
  props
) => {
  const { children } = props;
  const [wrapperElement, setWrapperElement] =
    React.useState<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    let element = document.getElementById(PORTAL_WRAPPER_ID);
    let isSyntethic: boolean = false;

    if (!element) {
      element = createWrapperAndAppendToBody(PORTAL_WRAPPER_ID);
      isSyntethic = true;
    }

    setWrapperElement(element);

    return () => {
      if (isSyntethic && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, []);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}
