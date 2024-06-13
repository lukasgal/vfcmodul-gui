import React from "react";
import { Panel } from "./Panel";
import { useTranslation } from "react-i18next";

const SearchPanel = () => {
  const {t} = useTranslation();

  return (
    <Panel title={t('enterSearch')}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <input
          type="text"
          style={{
            width: "100%",
            display: "inline-flex",
            marginRight: 10,
            borderStyle: "solid",
            borderColor: "#999999",
          }}
        />
        <button className="button" style={{ width: 120, textAlign: "left" }}>
          {t('search')}
        </button>
      </div>
    </Panel>
  );
};

export default SearchPanel;
