import React, { useContext } from "react";
import { Panel } from "./Panel";
import { useTranslation } from "react-i18next";
import { FPTContext, VFCObjectPanels, VFCResultsContext, VFCTypeToID } from "../store";
import { SelectedResults, VFCObject, VFCResultsContextType } from "../@types";
import "../styles/SelectedDefectPanel.css";
import { deleteVFCObject } from "../reducers";
import { cancel, submit } from "../utils/actions";

type ResultItemProps = {
	item: VFCObject;
	context: VFCResultsContextType;
};
const ResultItem = ({ item, context }: ResultItemProps) => {
	if (!item) return null;
	return (
		<div className="resultItem">
			<img
				src={`${process.env.PUBLIC_URL}/delete.svg`}
				className="deleteIcon"
				alt="delete"
				onClick={() => {
					deleteVFCObject(item, context);
				}}
			/>
			<strong>{item.path}</strong>
			<br />
			{item.descLong}
		</div>
	);
};

const SelectedDefectsPanel = () => {
	const { t } = useTranslation();
	const context = useContext(VFCResultsContext);

	const fptCtx = useContext(FPTContext).toLocaleLowerCase();
	const panels = VFCObjectPanels.filter((f) => {
		return VFCTypeToID[f.type].startsWith("fo") ? VFCTypeToID[f.type] === "fo" + fptCtx : true;
	});
	return (
		<Panel title={t("selectedDefectSymptom")}>
			<div style={{ minHeight: 120 }}>
				<table style={{ width: "100%", tableLayout: "fixed", height: 90 }}>
					<thead>
						<tr>
							{panels.map((item) => (
								<th key={item.id} style={{ borderBottom: "1px solid #999999" }}>
									{t(item.title)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style={{ textAlign: "left", verticalAlign: "top" }}>
								<ResultItem item={context.selectedData.FO_F || context.selectedData.FO_K} context={context} />
							</td>
							<td style={{ textAlign: "left", verticalAlign: "top" }}>
								<ResultItem item={context.selectedData.FA} context={context} />
							</td>
							<td style={{ textAlign: "left", verticalAlign: "top" }}>
								<ResultItem item={context.selectedData.FL_F} context={context} />
							</td>
							<td style={{ textAlign: "left", verticalAlign: "top" }}>
								<ResultItem item={context.selectedData.FL_O} context={context} />
							</td>
							<td style={{ textAlign: "left", verticalAlign: "top" }}>
								<div style={{ overflowY: "auto", height: 80 }}>
									{context.selectedData.FB
										? context.selectedData.FB.map((i) => <ResultItem item={i} context={context} key={i.vfcId} />)
										: null}
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<div className="controls">
					<button onClick={() => submit(context.selectedData)}>{t("btnAccept")}</button>
					<button onClick={() => context.setSelectedData({} as SelectedResults)}>{t("btnDeleteSelection")}</button>
					<button onClick={() => cancel()}>{t("btnCancel")}</button>
				</div>
			</div>
		</Panel>
	);
};

export default SelectedDefectsPanel;
