import { BROWSERS } from "../lib/fetch";

export function AddNew() {
	return (
		<details open>
			<summary className={`p_05em pt_2em`}>
				<strong>Add New (1)</strong>
			</summary>
			<div className="d_grid gtc_320px bgc_light" style={{ borderLeft: `.25em solid var(--background-color-dark)` }}>
				<div className="p_05em d_flex gap_5px h_3em">
					<input type="text" className="pl_05em fs_16px ff_inherit b_1px_dashed w_100pct" placeholder="Enter name... ⏎" />
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