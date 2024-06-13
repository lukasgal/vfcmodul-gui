import React from "react";
import { SelectCallback, VFCObject } from "../@types";

type Props = {
	items: VFCObject[];
	clickHandler: SelectCallback;
	style?: React.CSSProperties;
};

const TreeItem = ({ items, clickHandler, style }: Props) => {
	return (
		<div
			style={{
				...{
					height: "100%",
					width: "100%",
					overflowY: "auto",
					maxHeight: 300,
				},
				...style,
			}}
		>
			<ul>
				{items.map((item) => (
					<li
						key={item.vfcId}
						className={!item.selectable ? "disabled" : "activeElement"}
						onClick={() => (item.selectable ? clickHandler(item) : null)}
					>
						{item.descLong} ({item.vfcId})
					</li>
				))}
			</ul>
		</div>
	);
};

export default TreeItem;
