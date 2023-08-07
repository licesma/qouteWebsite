import * as React from "react";

export interface ULinkProps {
  className: string;
  href: string;
  children: string | JSX.Element | JSX.Element[];
}

export const ULink: React.FunctionComponent<ULinkProps> = ({
  className,
  children,
  href,
}) => {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
};
