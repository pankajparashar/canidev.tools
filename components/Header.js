import { useEffect, useState } from "react";

import { BROWSERS } from "../lib/fetch";
import { Search } from "./Search"

export function Header({ records }) {
	const [showSearch, setShowSearch] = useState(false)
	const toggleSearch = prevState => setShowSearch(!showSearch)
	
	return (
		<div className={`d_grid gtc_320px c_fff bgc_000 pos_sticky top_0`} id="header">
			<div className="br_1px_dark bb_1px_353939 d_grid gtc_3em_1fr_3em ai_center h_3em"  style={{ position: "relative" }}>
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
				{!showSearch ?
					<div className="pl_1em fg_1 br_1px_dark h_3em d_flex ai_center jc_sb pr_1em">
						<strong>Can I DevTools?</strong>
						<span className="fw_bold" style={{ color: "antiquewhite" }}>{records.length}</span>
					</div>
					: <Search records={records} setShowSearch={setShowSearch} />
				}
				<button onClick={toggleSearch} className="but_2 d_flex ai_center jc_center">
					{!showSearch ? 
						<svg height="3em" version="1.1" viewBox="0 0 752 752">
							<path d="m198.41 198.41 138.13 157.86v157.86l78.934 39.461v-197.33l138.13-157.86h-177.59z" fill="#fff"/>
						</svg> :
						<svg height="3em" version="1.1" viewBox="0 0 752 752">
							 <path d="m376 178.68c-108.98 0-197.32 88.344-197.32 197.32s88.348 197.32 197.32 197.32c108.98 0 197.32-88.348 197.32-197.32 0.003906-108.98-88.344-197.32-197.32-197.32zm69.766 295-69.766-69.766-69.766 69.766-27.906-27.906 69.77-69.766-69.77-69.766 27.906-27.906 69.766 69.77 69.766-69.766 27.906 27.906-69.766 69.762 69.766 69.766z" fill="#fff"/>
						</svg>
					}
				</button>
			</div>
			<div className={`d_grid gtc_5fr bb_1px_353939 h_3em`}>
				{BROWSERS.map(browser => (
					<button key={browser} className={`but_2 br_1px_dark d_flex jc_center ai_center`}>
						{{
							"Chrome":
								<svg height="1.75em" fill="#fff" viewBox="0 0 32 32"><path d="M16 24.188c-1.625 0-3.104-.438-4.438-1.312-1.334-.875-2.334-2-3-3.375L2 8c-1.375 2.459-2 5.209-2 8 0 4 1.302 7.49 3.906 10.469s5.844 4.76 9.719 5.344l4.641-8.031c-.467.137-1.246.406-2.266.406z"/><path d="M10.969 9.531C12.447 8.386 14.125 8 16 8h13.75c-1.417-2.416-3.344-4.458-5.781-5.875C21.531.709 18.875 0 16 0c-2.5 0-4.834.531-7 1.594-2.167 1.062-4.172 2.609-5.641 4.594L8 14c.458-1.791 1.489-3.322 2.969-4.469z"/><path d="M30.797 10H21.5c1.625 1.625 2.688 3.709 2.688 6a8.183 8.183 0 0 1-1.438 4.688L16.188 32c4.375-.042 8.104-1.625 11.188-4.75C30.458 24.125 32 20.375 32 16c0-2.041-.344-4.188-1.203-6z"/><circle cx="16" cy="16" r="6"/></svg>,
							"Firefox":
								<svg height="1.75em" fill="#fff" viewBox="9.7 16.5 280 266"><path d="M288.9 113.8c-1.4 3.5-2.5 7.1-3.9 10.6-1-14.7-3.4-29.3-8.1-43.2-3.2-8.6-6.9-17.2-13.3-23.9.9 8.2 3 16.2 2.8 24.5-1.8-6.3-3.9-12.7-7.7-18.1-8.2-12.7-21.5-21.3-35.7-25.9-3.7-1.2-7.6-1.9-10.9-3.9-20.4-11.9-44.2-17.8-67.8-17.2-30.7.4-60.9 12.5-83.4 33.3-3.5 3.3-6.7 6.9-10.2 10.3-6.1-7.1-9.2-16.1-9.6-25.4-5.5 4.7-8.7 11.5-11 18.2-3.2 9.4-4.9 19.4-3.9 29.3.1 2.2.7 4.6-.8 6.5-7.8 11.4-14.1 24.4-15.6 38.3 2.5-1.7 4.9-3.5 7.4-5.2-1 5-2.4 10-3.2 15.1-3.5 24.5 1 50 12.7 71.9 12.8 23.6 32.6 43.1 55.9 56.4 26.2 14.9 57.5 20.4 87.3 15.6 26-4.3 51.2-15.7 69.8-34.6 13.2-13.4 24.7-28.5 33-45.4 13.6-26.8 19.3-57.5 16.2-87.2m-48.7 38.4c-2.7-5.5-4.1-12-9.3-15.8 1.3 13.8 1.9 27.8-1.2 41.4-1.9 9.2-6 18.1-12.7 24.8 1.2-6.6 2.3-13.3 1.9-20-9.7 13.1-21.4 25.2-36.3 32.3-12.6 6.1-27.5 5.8-40.7 1.7-12-3.9-22.4-11.3-31.6-19.7h3.2c9 .6 18.1-.7 26.7-3.2 8.6-2.5 15-8.9 22.5-13.4 3.5-2.1 7.9-1.2 11.7-2.3 2.4-1.3 3.2-4.8 1-6.7-5.6-6.1-13.7-11-22.2-10-8.2 1.2-14.9 6.8-23 8.7-5.8 1-11.7-.8-16.8-3.4-7.3-3.7-12.8-9.9-18-16l-2.3-1.9c0-.9 0-1.9.1-2.8.5-2.5 1.9-4.7 3.1-7l1.4-2.8c8.1.6 16.1 1.9 24 3.9-.1-7.5-.6-16-5.2-22.2l1.6-1.2c5.1-4 9.8-8.7 15.5-11.8 2.3-1.2 4.4-2.8 6.1-4.7l.4-3.4h-.1c.1-1.3-.1-2.7-.1-4-2.8-.3-5.6-.5-8.5-.5l-7.8-.5c-.6-.4-1.2-.8-1.8-1.1-5.3-3.3-9.9-7.7-14.9-11.4l-2-1.8.3-2.7c1.9-12.5 11.1-22.3 20.7-29.8-6.8 1-13.5 2.9-19.6 6C99.9 54 94.4 58.7 89 63.3c-10.9-2.8-22.6-1.1-33 2.9-5.1 2.3-9.7 5.7-14.7 8.3 3.2-3.2 6.9-5.7 10.5-8.5 3.2-2.4 5.6-5.7 8.4-8.5 20.8-21.4 49.9-34.3 79.6-35.8 19.7-1 40 2.1 57.8 10.8-4.8-.2-9.5-.5-14.3-.4 10.7 3.2 23.2 6.6 29.2 17-5.5.2-11.1.3-16.4 2.1 15.3 5.9 30.7 13.2 42.1 25.4 6.8 7.3 11.5 16.8 11.3 27-3.6-2.7-7.3-5.2-11.3-7.2 4.3 18.1 7 37.4 2 55.8"/></svg>,
							"Edge": 
								<svg height="1.75em" fill="#fff" viewBox="0 0 1792 1792"><path d="M69 795h1q16-126 58.5-241.5t115-217 167.5-176 223.5-117.5 276.5-43q231 0 414 105.5t294 303.5q104 187 104 442v188h-1125q1 111 53.5 192.5t136.5 122.5 189.5 57 213 3 208-46.5 173.5-84.5v377q-92 55-229.5 92t-312.5 38-316-53q-189-73-311.5-249t-124.5-372q-3-242 111-412t325-268q-48 60-78 125.5t-46 159.5h635q8-77-8-140t-47-101.5-70.5-66.5-80.5-41-75-20.5-56-8.5l-22-1q-135 5-259.5 44.5t-223.5 104.5-176 140.5-138 163.5z"/></svg>,
							"Safari":
								<svg height="1.75em" fill="#fff" enableBackground="new 0 0 24 24" viewBox="0 0 24 24"><path d="M4.77,7.448c-0.106,0-0.75-0.44-0.886-0.522c-0.954,1.514-1.462,3.28-1.462,5.076c0,0.63,0.068,1.249,0.189,1.863l0.905-0.208c0.077-0.01,0.213,0.043,0.213,0.135c0,0.097-0.029,0.175-0.135,0.203L2.67,14.198c0.562,2.371,2.023,4.447,4.045,5.787c0.121-0.16,0.522-0.963,0.711-0.963c0.092,0,0.174,0.083,0.174,0.174c0,0.106-0.508,0.842-0.59,0.978c1.5,0.915,3.227,1.408,4.984,1.408c0.659,0,1.312-0.068,1.955-0.203l-0.213-0.909c-0.01-0.068,0.043-0.203,0.135-0.203c0.112,0,0.189,0.014,0.203,0.135l0.213,0.895c2.328-0.576,4.38-2.023,5.705-4.031c-0.16-0.097-0.787-0.415-0.788-0.59c0-0.092,0.083-0.174,0.183-0.174c0.106,0,0.668,0.402,0.803,0.47c0.909-1.485,1.394-3.212,1.394-4.969c0-0.629-0.068-1.258-0.189-1.872l-0.765,0.174c-0.068,0.01-0.203-0.043-0.203-0.135c0-0.106,0.014-0.184,0.135-0.213l0.75-0.16c-0.552-2.333-1.97-4.38-3.954-5.72c-0.096,0.16-0.454,0.857-0.643,0.857c-0.092,0-0.16-0.083-0.16-0.175c0-0.106,0.43-0.736,0.522-0.871c-1.529-0.954-3.281-1.462-5.076-1.462c-0.605,0-1.205,0.068-1.795,0.175l0.203,0.886c0.01,0.077-0.038,0.213-0.135,0.213s-0.175-0.029-0.203-0.135L9.87,2.667C7.514,3.2,5.438,4.637,4.073,6.63c0.16,0.111,0.871,0.469,0.871,0.658C4.945,7.38,4.862,7.448,4.77,7.448z M10.94,11.221c0.164-0.281,6.023-5.67,6.657-6.264l-4.687,7.774c-0.15,0.257-6.029,5.68-6.644,6.257L10.94,11.221z"/><path d="M12,24c6.629,0,12-5.371,12-12S18.629,0,12,0S0,5.371,0,12S5.371,24,12,24z M12,1.287c5.918,0,10.713,4.795,10.713,10.713c0,5.918-4.795,10.713-10.713,10.713S1.287,17.918,1.287,12C1.287,6.082,6.082,1.287,12,1.287z"/><path d="M11.865,11.182c-0.47,0-0.789,0.416-0.789,0.857c0,0.455,0.416,0.779,0.852,0.779c0.47,0,0.779-0.416,0.779-0.857C12.707,11.492,12.295,11.182,11.865,11.182z"/></svg>,
							"Opera":
								<svg height="1.75em" fill="#fff" viewBox="0 0 24 24"><path d="M11.9963,2c-5.462,0-9.278,3.95814-9.278,9.899,0,5.28991,3.7112,10.101,9.28549,10.101,5.56676,0,9.27787-4.81857,9.27787-10.101C21.28168,5.95814,17.45831,2,11.9963,2Zm0,18.38381c-3.39693,0-3.77107-5.01309-3.77107-8.7093V11.5997c0-3.99549.59858-8.23042,3.74864-8.23042s3.786,4.3621,3.786,8.3576C15.75987,15.42311,15.39318,20.38381,11.9963,20.38381Z"/></svg>
						}[browser] || browser}
					</button>
				))}
			</div>
		</div>
	);
}
