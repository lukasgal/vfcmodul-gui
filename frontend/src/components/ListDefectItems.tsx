import React from "react";
import TreeItem from "./TreeItem";
import { VFCType } from "../store";
import { SelectCallback, VFCObject } from "../@types";

type Props = {
	type?: VFCType;
	data: VFCObject[];
	onClickHandler: SelectCallback;
	style?: React.CSSProperties;
};

export const ListDefectItems = ({ data, onClickHandler, style }: Props) => {

	return (
		<div>
			<TreeItem items={data} clickHandler={onClickHandler} style={style} />
		</div>
	);
};
