import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type FulltextSearchProps = {
	searchHandler: (fulltext: string) => void;
};

const FulltextSearch = ({ searchHandler }: FulltextSearchProps) => {
	const [t] = useTranslation();
	const [fulltext, setFulltext] = useState<string>("");

	return (
		<div style={{ marginLeft: 20, display: "flex", flexDirection: "row", verticalAlign: "middle", flex: 1 }}>
			<label key={"C"} className="input-inline" style={{ display: "flex", flexDirection: "row", width: "100%" }}>
				<div style={{ paddingBottom: 3, alignContent: "center" }}>{t("fulltext")}</div>
				<input
					type="text"
					style={{
						border: "1px solid #999999",
						marginLeft: 15,
						height: 19,
						flex: 1,
					}}
					className="input-inline"
					onChange={(e) => setFulltext(e.target.value.toLocaleLowerCase())}
					onKeyDown={(e) => {
						if (e.key === "Enter") searchHandler(fulltext);
					}}
				/>
				<button
					className="button"
					style={{ width: 120, textAlign: "left", height: 24, paddingBottom: 3, alignContent: "center" }}
					onClick={() => searchHandler(fulltext)}
				>
					{t("search")}
				</button>
			</label>
		</div>
	);
};

export default FulltextSearch;
