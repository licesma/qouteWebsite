import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ClientOnlyPortalProps {
  selector: string;
  children: JSX.Element;
}

export const ClientOnlyPortal: React.FunctionComponent<
  ClientOnlyPortalProps
> = (props) => {
  const { selector } = props;
  const ref = useRef<Element>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector) ?? undefined;
    setMounted(true);
  }, [selector]);

  return mounted && ref.current
    ? createPortal(props.children, ref.current)
    : null;
};
