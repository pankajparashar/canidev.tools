import { useEffect, useState } from "react";

import { BROWSERS } from "../lib/fetch";

export function Header({ records }) {
	return (
		<div className={`d_grid gtc_320px c_fff bgc_000 pos_sticky top_0`} id="header">
			<div className="br_1px_dark bb_1px_353939 d_grid gtc_3em_1fr_3em ai_center h_3em">
				<button className="but_2 br_1px_dark d_grid ai_center" onClick={e => (window.location.href = "/")} title="/">
					<svg version="1.1" viewBox="0 0 752 752" className="w_100pct">
						<linearGradient x1="0" y1="0" x2="100%" y2="100%" id="gradient">
							<stop stopColor="#FF1700" offset="0"/>
							<stop stopColor="#F6F54D" offset="100%"/>
						</linearGradient>
					 	<g>
					  		<rect width="752" height="752"/>
					  		<path d="m490.73 249.34-197.32 276.25-32.125-22.93 197.32-276.25zm75.199 170.45-98.664-78.93-24.645 30.844 79.387 63.496-79.402 63.52 24.645 30.844 98.664-78.93c4.6953-3.7734 7.418-9.4336 7.418-15.434s-2.7227-11.664-7.4023-15.41zm-256.52-39.465-79.402-63.52 79.402-63.52-24.664-30.824-98.664 78.93c-4.6758 3.75-7.3984 9.4141-7.3984 15.414s2.7227 11.66 7.3984 15.41l98.664 78.93z" fill="url(#gradient)" />
					 	</g>
					</svg>		
				</button>
				<div className="pl_1em fg_1 br_1px_dark h_3em d_flex ai_center"><strong>Can I DevTools?</strong></div>
				{records ? <div className="p_05em c_gold d_grid jc_center">{records.length}</div> : null}
			</div>
			<div className={`d_grid gtc_5fr bb_1px_353939 h_3em`}>
				{BROWSERS.map(browser => (
					<button key={browser} className={`but_2 br_1px_dark`}>
						{browser}
					</button>
				))}
			</div>
		</div>
	);
}
