import "./i18next/config";
import React, { useEffect, useState } from "react";
import "./App.css";
import TabSet from "./components/TabSet";
import TabContent from "./components/TabContent";
import { FPTContext, getWrongVFCObjects, mainTabs, VFCDataContext, VFCResultsContext, VFCType } from "./store";
import { randomVFC } from "./dataGenerator";
import { MainTabsProps, SelectedResults, VFCDataContextType } from "./@types";
import SelectedDefectsPanel from "./components/SelectedDefectsPanel";

const dummyData = {
	[VFCType.FA]: [...getWrongVFCObjects(VFCType.FA), ...randomVFC(VFCType.FA)],
	[VFCType.FO_F]: [...getWrongVFCObjects(VFCType.FO_F), ...randomVFC(VFCType.FO_F)],
	[VFCType.FO_K]: [...getWrongVFCObjects(VFCType.FO_K), ...randomVFC(VFCType.FO_K)],
	[VFCType.FL_F]: [...getWrongVFCObjects(VFCType.FL_F), ...randomVFC(VFCType.FL_F)],
	[VFCType.FL_O]: [...getWrongVFCObjects(VFCType.FL_O), ...randomVFC(VFCType.FL_O)],
	[VFCType.FB]: [...getWrongVFCObjects(VFCType.FB), ...randomVFC(VFCType.FB)],
} as VFCDataContextType;

function App() {
	const queryParameters = new URLSearchParams(window.location.search);

	const title = queryParameters.get("t");
	const system = queryParameters.get("system");
	const password = queryParameters.get("password");
	const fpt = queryParameters.get("fpt");

	const [activeTab, setActiveTab] = useState<string>(mainTabs[1].id);
	const [selectedData, setSelectedData] = useState<SelectedResults>({} as SelectedResults);

	useEffect(() => {
		if (title) document.title = `VFC: ${title}`;
	}, [title]);

	if (system !== process.env.REACT_APP_USERNAME || password !== process.env.REACT_APP_PASSWORD)
		return <code style={{ padding: 10 }}>Unauthorized</code>;

	return (
		<div className="App">
			<VFCResultsContext.Provider value={{ selectedData, setSelectedData }}>
				<FPTContext.Provider value={fpt === "fpc" ? "K" : "F"}>
					<VFCDataContext.Provider value={dummyData}>
						<TabSet activeTab={activeTab} setActiveTab={setActiveTab} tabs={mainTabs} name="topTabset" />
						<TabContent>
							{(mainTabs.find((t) => t.id === activeTab) as MainTabsProps)?.component}
							<SelectedDefectsPanel />
						</TabContent>
					</VFCDataContext.Provider>
				</FPTContext.Provider>
			</VFCResultsContext.Provider>
		</div>
	);
}

export default App;
