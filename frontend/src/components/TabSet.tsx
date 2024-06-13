import "../styles/TabSet.css";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { TabProps } from "../@types";

export interface TabSetProps {
  name: string;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  tabs: TabProps[];
}

const TabSet = ({ name, tabs, activeTab, setActiveTab }: TabSetProps) => {
  const { t } = useTranslation();
  return (
    <div className="tabset">
      {tabs.map((tab) => (
        <React.Fragment key={tab.id}>
          <input
            type="radio"
            name={name}
            id={tab.id}
            checked={activeTab === tab.id}
            onChange={() => setActiveTab(tab.id)}
          />
          <label htmlFor={tab.id}>{t(tab.title)}</label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TabSet;
