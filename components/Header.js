import { useEffect, useState } from "react";
import Fuse from "fuse.js";

import { BROWSERS } from "../lib/fetch";

export function Header({ records, setRecords, setShowFavorites }) {
	const [browsers, setBrowsers] = useState({});
	const [search, setSearch] = useState(false);
	const [fuse, setFuse] = useState(null);
	const [query, setQuery] = useState("")

	useEffect(() => {
		const browsers = Object.fromEntries(BROWSERS.map(b => [b, 0]));
		records.forEach((record) => {
			record.display &&
				Object.keys(browsers).forEach((browser) => {
					const count = browsers[browser];
					browsers[browser] = record.fields[browser] ? count + 1 : count;
				});
		});

		const options = {
			includeScore: false,
			minMatchCharLength: 3,
			threshold: 0.25,
			keys: ["fields.Name"]
		};

		setFuse(new Fuse(records, options));
		setBrowsers(browsers);
	}, [records]);

	const runQuery = q => {
		let result = [];
		if (q.startsWith("id:")) {
			let match = /id:(.*)/.exec(q)
			if (match && match[1]) {
				match = records.find(r => r.fields.Slug === match[1])
				result = match === undefined ? [] : [match]
			}
		} else {
			result = fuse.search(q).map((r) => r.item);
		}
		if (result && result.length !== 0) {
			filterResults(result);
		}
	}

	const onKeyDown = (event) => {
		if (event.key === "Enter") {
			if (query) {
				runQuery(query)
			} else clearResults();
		} else if (event.keyCode === 27) {
			clearResults();
		}
	};

	const filterResults = (result) => {
		const ids = result.map((r) => r.id);
		records.forEach((record) => {
			if (!ids.includes(record.id)) {
				record.display = false;
			}
		});
		setRecords([...records]);
		setShowFavorites(false)
	};

	const clearResults = () => {
		setQuery("")
		setSearch(false);
		records.forEach((record) => (record.display = true));
		setRecords([...records]);
		setShowFavorites(true)
	};

	useEffect(() => {
		!search && clearResults()
	}, [search])

	return (
		<div className={`d_grid gtc_320px c_fff pos_sticky top_0`} id="header">
			<div className={`d_grid gtc_35em bgc_000`}>
				<div className={`br_1px_dark bl_025em_dark d_flex ai_center mh_35em`}>
					{search ? (
						<input
							autoFocus
							type="search"
							value={query}
							onChange={e => setQuery(e.target.value)}
							className={`pl_05em`}
							placeholder="Can I ...? (Enter ↲)"
							onKeyDown={onKeyDown}
						/>
					) : (
						<div className={`pl_05em d_flex jc_sb w_100pct`}>
							<div><strong>Can I DevTools?</strong></div>
						</div>
					)}
					<div className="pl_05em pr_05em">(<a href="/">{records.length}</a>)</div>
				</div>
				<div className={``}>
					<button
						aria-label="search"
						className={`but_2`}
						onClick={() => setSearch(!search)}
					>
						{search ? (
							<img
								src="https://img.icons8.com/material-outlined/18/ffffff/delete-sign.png"
								alt="close"
							/>
						) : (
							<svg
								version="1.0"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24.000000 24.000000"
								preserveAspectRatio="xMidYMid meet"
							>
								<g
									transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
									fill="#ffffff"
									stroke="none"
								>
									<path
										d="M10 223 c0 -5 20 -28 44 -53 39 -41 43 -48 38 -84 -4 -32 -1 -42 19
			   -57 37 -29 42 -24 37 39 -4 57 -3 59 39 103 24 24 43 47 43 52 0 4 -49 7 -110
			   7 -61 0 -110 -3 -110 -7z"
									/>
								</g>
							</svg>
						)}
					</button>
				</div>
			</div>
			<div className={`d_grid gtc_5fr bgc_333 bb_1px_dark`}>
				{Object.entries(browsers).map(([browser, count]) => (
					<div
						key={browser}
						className={`br_1px_dark p_05em`}
						style={{
							display: "flex",
							justifyContent: "space-between",
							flexDirection: "row",
							flexWrap: "wrap",
							alignItems: "center"
						}}
					>
						<div>{browser}</div>
						<div>{`(${count})`}</div>
					</div>
				))}
			</div>
		</div>
	);
}
