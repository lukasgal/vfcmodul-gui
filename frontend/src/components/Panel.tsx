import React from "react";
import '../styles/Panel.css';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const Panel = ({ title, children }: Props) => {
  return (
    <div className="panel">
      <div className="panelTitle">{title}</div>
      <div className="pannelContent">{children}</div>
    </div>
  );
};
