import React, { useState } from "react";
import TabSet from "../components/TabSet";
import TabContent from "../components/TabContent";
import { freeTextSearchTabs } from "../store";
import SearchPanel from "../components/SearchPanel";
import { MainTabsProps } from "../@types";

export const FreeTextEntryPage = () => {
	const [activeTab2, setActiveTab2] = useState<string>(freeTextSearchTabs[0]?.id);
	return (
		<div>
			<SearchPanel />
			<TabSet activeTab={activeTab2} setActiveTab={setActiveTab2} tabs={freeTextSearchTabs} name="middleTabset" />
			<TabContent>{(freeTextSearchTabs.find((t) => t.id === activeTab2) as MainTabsProps).component}</TabContent>
		</div>
	);
};
