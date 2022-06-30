import { useEffect, useState } from "react";

import { BROWSERS } from "../lib/fetch";

export function Header({ records }) {
	return (
		<div className={`d_grid gtc_320px c_fff bgc_000 pos_sticky top_0`} id="header">
			<div className="br_1px_dark bb_1px d_flex mh_35em ai_center">
				<button className="w_35em but_2 p_05em logo br_1px_dark" onClick={e => (window.location.href = "/")} title="/">
				</button>
				<div className="pl_1em fg_1"><strong>Can I DevTools?</strong></div>
				{records ? <div className="p_05em">({records.length})</div> : null}
			</div>
			<div className={`d_grid gtc_5fr bb_1px mh_35em`}>
				{BROWSERS.map(browser => (
					<button key={browser} className={`but_2 br_1px_dark`}>
						{browser}
					</button>
				))}
			</div>
		</div>
	);
}
