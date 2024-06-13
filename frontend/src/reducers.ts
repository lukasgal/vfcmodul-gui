import { SelectedResults, VFCObject, VFCResultsContextType } from "./@types";
import { VFCType } from "./store";

export const deleteVFCObject = (item: VFCObject, context: VFCResultsContextType) => {
	if (item) {
		const ctxData = context.selectedData;
		const keys = Object.keys(ctxData) as Array<keyof SelectedResults>;
		const objKey = keys[keys.indexOf(item.vfcType as keyof SelectedResults)] as keyof SelectedResults;
		if (item.vfcType === VFCType.FB) {
			const arr = ctxData[objKey] as VFCObject[];
			arr.splice(arr.indexOf(item), 1);
			const res: SelectedResults = {
				...ctxData,
				...{
					FB: [...arr],
				},
			};
			context.setSelectedData(res);
		} else {
			const { [objKey]: remove, ...remaining } = ctxData;
			context.setSelectedData(remaining as SelectedResults);
		}
	}
};

export const addVFCObject = (item: VFCObject | null, context: VFCResultsContextType) => {
	if (item) {
		const keys = Object.keys(context.selectedData) as Array<keyof SelectedResults>;
		const objKey = keys[keys.indexOf(item.vfcType as keyof SelectedResults)] as keyof SelectedResults;

		if (item.vfcType === VFCType.FB) {
			const ctxData = context.selectedData;
			const arr = ctxData.FB ? ctxData.FB : [];
			ctxData.FB = arr;
			if (arr.includes(item)) return;
			arr.push(item);
			context.setSelectedData({
				...ctxData,
				...{ [VFCType[item.vfcType]]: arr },
			});
		} else if (objKey && context.selectedData[objKey] != null) {
			return;
		} else {
			const newObj = { [VFCType[item.vfcType as VFCType]]: item };
			context.setSelectedData({ ...context.selectedData, ...newObj });
		}
	}
};
