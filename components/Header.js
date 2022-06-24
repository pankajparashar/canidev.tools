import { useEffect, useState } from "react";
import Fuse from "fuse.js";

import { BROWSERS } from "../lib/fetch";

export function Header({ records, setRecords, setShowFavorites }) {
	const [showSearch, setShowSearch] = useState(false)
	const [query, setQuery] = useState("")
	const [fuse, setFuse] = useState(new Fuse(records, {
		includeScore: false,
		minMatchCharLength: 3,
		threshold: 0,
		keys: ["fields.Name"]
	}));

	const browsers = Object.fromEntries(BROWSERS.map(b => [b, 0]));
	records.forEach((record) => {
		record.display &&
			Object.keys(browsers).forEach((browser) => {
				const count = browsers[browser];
				browsers[browser] = record.fields[browser] ? count + 1 : count;
			});
	});

	useEffect(() => {
		const url = new URL(window.location.href);
		const params = url.searchParams;
		const id = params.get("id")
		if (id) {
			const target = document.getElementById(id)
			if (target) {
				const element = document.getElementById(id);
				const headerOffset = document.getElementById("header").offsetHeight;
				const elementPosition = element.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

				console.log(offsetPosition)
				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth"
				});
			}
		}
	}, [])

	const runQuery = q => {
		const result = fuse.search(q).map((r) => r.item);
		if (result && result.length !== 0) {
			const ids = result.map((r) => r.id);
			records.forEach((record) => {
				if (!ids.includes(record.id)) {
					record.display = false;
				}
			});
			setRecords([...records]);
		} else {
			clearResults()
		}
	}

	const clearResults = () => {
		records.forEach((record) => (record.display = true));
		setRecords([...records]);
	}

	const onClose = () => {
		setQuery("")
		setShowSearch(false)
		clearResults()
	}

	const onBrowserClick = browser => {
		records.forEach((record) => {
			if (record.fields[browser]) {
				record.display = true
			} else {
				record.display = false
			}
		});
		setRecords([...records]);
	}

	return (
		<div className={`d_grid gtc_320px c_fff pos_sticky top_0`} id="header">
			<div className={`d_grid gtc_35em bgc_000 bb_1px`}>
				<div className={`br_1px_dark bl_025em_dark d_flex ai_center mh_35em`}>
					{showSearch ? (
						<input
							autoFocus
							autoComplete="off"
							spellCheck="false"
							autoCapitalize="off"
							autoCorrect="off"
							type="search"
							value={query}
							onChange={e => {
								setQuery(e.target.value)
								runQuery(e.target.value)
							}}
							className={`pl_05em`}
							placeholder="Can I ...? (Enter ↲)"
						/>
					) : (
						<div className={`pl_05em d_flex jc_sb w_100pct h_100pct ai_center`}>
							<div><strong>Can I DevTools?</strong></div>
							<button style={{ width: "auto" }} className="but_2 pl_05em pr_05em" onClick={() => window.location.href = "/"} title="/home">({records.filter((r) => r.display).length})</button>
						</div>
					)}

				</div>
				<div className={`br_1px_dark`}>
					{showSearch ? (
						<button aria-label="search" className={`but_2`} onClick={onClose}>
							<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24" fill="#ffffff">
								<path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z">
								</path>
							</svg>
						</button>
					) : (
						<button aria-label="close" className={`but_2`} onClick={() => setShowSearch(true)}>
							<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24" fill="#ffffff">
								<g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none">
									<path d="M10 223 c0 -5 20 -28 44 -53 39 -41 43 -48 38 -84 -4 -32 -1 -42 19 -57 37 -29 42 -24 37 39 -4 57 -3 59 39 103 24 24 43 47 43 52 0 4 -49 7 -110 7 -61 0 -110 -3 -110 -7z" />
								</g>
							</svg>
						</button>
					)}
				</div>
			</div>
			<div className={`d_grid gtc_5fr bgc_000 bb_1px`}>
				{Object.entries(browsers).map(([browser, count]) => (
					<button key={browser} className={`but_2 br_1px_dark`} onClick={() => onBrowserClick(browser)}>
						<div

							className={`p_05em`}
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
						</div></button>
				))}
			</div>
		</div>
	);
}
