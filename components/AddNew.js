import { useState } from "react";
import { BROWSERS } from "../lib/fetch";

export function AddNew() {
	const [title, setTitle] = useState("")
	
	const onAdd = () => {
		const params = new URLSearchParams({ title, labels: "Add", assignees: "pankajparashar" })
		const url = 'https://github.com/pankajparashar/canidev.tools/issues/new?' + params.toString()
		window.open(url, "_blank")
	}
	
	return (
		<details open>
			<summary className={`p_05em pt_2em`}>
				<strong>Add New (1)</strong>
			</summary>
			<div className="d_grid gtc_320px bgc_light" style={{ borderLeft: `.25em solid var(--background-color-dark)` }}>
				<div className="p_05em d_flex gap_5px h_3em">
					<button className="w_auto but_1" title="Add" onClick={onAdd} disabled={!title}>
						<svg x="0px" y="0px"
						width="18" height="18"
						viewBox="0 0 50 50"
						fill="var(--background-color-dark)"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path></svg>
					</button>
					<input type="text" className="pl_05em fs_16px ff_inherit b_1px_dashed w_100pct" placeholder="Enter name" value={title} onChange={e => setTitle(e.target.value)} />
				</div>
				<div className={`d_grid gtc_5fr p_05em h_3em`}>
					{BROWSERS.map((browser) => (
						<button className="b_1px_dashed">
							<input type="checkbox" />
						</button>
					))}
				</div>
			</div>
		</details>
	)
}