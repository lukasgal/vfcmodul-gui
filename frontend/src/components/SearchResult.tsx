import React, { useContext } from "react";
import { Panel } from "./Panel";
import { FPTContext, VFCDataContext, VFCObjectPanels, VFCResultsContext, VFCTypeToID } from "../store";
import { useTranslation } from "react-i18next";
import { addVFCObject } from "../reducers";
import { ListDefectItems } from "./ListDefectItems";

const SearchResult = () => {
	const { t } = useTranslation();
	const context = useContext(VFCResultsContext);
	const dataCtx = useContext(VFCDataContext);
	const fptCtx = useContext(FPTContext).toLocaleLowerCase();
	const panels = VFCObjectPanels.filter((f) => {
		return VFCTypeToID[f.type].startsWith("fo") ? VFCTypeToID[f.type] === "fo" + fptCtx : true;
	});
	return (
		<>
			<div className="h-columns">
				{panels.map((panel) => (
					<Panel title={t(panel.title)} key={panel.id}>
						<div style={{ minHeight: 300 }}>
							<ListDefectItems onClickHandler={(item) => addVFCObject(item, context)} data={dataCtx[panel.type]} />
						</div>
					</Panel>
				))}
			</div>
		</>
	);
};

export default SearchResult;
