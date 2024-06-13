import React, { useCallback, useContext, useEffect, useState } from "react";
import TabSet from "../components/TabSet";
import TabContent from "../components/TabContent";
import { FPTContext, VFCDataContext, VFCObjectPanels, VFCResultsContext, VFCType, VFCTypeToID } from "../store";
import { VFCObject, VFCObjectTabsProps } from "../@types";
import { addVFCObject } from "../reducers";
import { ListDefectItems } from "../components/ListDefectItems";

import { useTranslation } from "react-i18next";
import FulltextSearch from "../components/FulltextSearch";

type FPTProps = {
	value: string;
	searchHandler: (fulltext: string) => void;
};

const FPTSwitch = ({ value, searchHandler }: FPTProps) => {
	const [t] = useTranslation();
	return (
		<div style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
			<label className="radio-inline disabled" key={"F"}>
				<input type="radio" name="type" value="f" checked={value === "f"} disabled />
				{t("functionalType")}
			</label>
			<label className="radio-inline  disabled" key={"C"}>
				<input type="radio" name="type" value="k" checked={value === "k"} disabled />
				{t("constructiveType")}
			</label>
			<FulltextSearch searchHandler={searchHandler} />
		</div>
	);
};

export const TreeStructureSelectPage = () => {
	const context = useContext(VFCResultsContext);
	const fptCtx = useContext(FPTContext).toLocaleLowerCase();

	const panels = VFCObjectPanels.filter((f) => {
		return VFCTypeToID[f.type].startsWith("fo") ? VFCTypeToID[f.type] === "fo" + fptCtx : true;
	});

	const [activeTab, setActiveTab] = useState<string>(panels[0].id);

	const dataCtx = useContext(VFCDataContext);

	const activeTabObject = panels.find((t) => t.id === activeTab) as VFCObjectTabsProps;

	const allData: VFCObject[] = dataCtx[activeTabObject?.type];

	const [filtered, setFiltered] = useState<VFCObject[]>(allData);

	const filter = useCallback<(value: string) => void>(
		(value: string) => {
			if (!value || value === "") {
				setFiltered(allData);
				return;
			}
			setFiltered(allData.filter((f) => f.descLong.toLocaleLowerCase().includes(value)));
		},
		[allData],
	);

	useEffect(() => {
		filter("");
	}, [filter, activeTab]);

	return (
		<div>
			<TabSet activeTab={activeTab} setActiveTab={setActiveTab} tabs={panels} name="treeStructureSelectMiddle" />
			<TabContent>
				{activeTabObject?.type === VFCType.FO_F || activeTabObject?.type === VFCType.FO_K ? (
					<FPTSwitch value={fptCtx} searchHandler={filter} />
				) : (
					<div style={{ marginBottom: 10 }}>
						<FulltextSearch searchHandler={filter} />
					</div>
				)}
				{
					<ListDefectItems
						onClickHandler={(item) => addVFCObject(item, context)}
						data={filtered}
						style={{ minHeight: 411, maxHeight: 411 }}
					/>
				}
			</TabContent>
		</div>
	);
};
