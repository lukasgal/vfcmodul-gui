import React, { ReactNode } from "react";
export interface TabContentProps {
  children: ReactNode;
}
const TabContent = ({ children }: TabContentProps) => {
  return <div className="tab-panel">{children}</div>;
};

export default TabContent;
