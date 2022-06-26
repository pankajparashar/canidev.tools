import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import Image from 'next/image'

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
		<div className={`d_grid gtc_320px c_fff bgc_000 pos_sticky top_0`} id="header">
			<div className="br_1px_dark bb_1px d_flex mh_35em ai_center">
				<button className="w_35em but_2 p_05em logo br_1px_dark" onClick={e => (window.location.href = "/")} title="/">
				</button>
				<span className="pl_1em"><strong>Can I DevTools?</strong></span>
			</div>
			<div className={`d_grid gtc_5fr bb_1px mh_35em`}>
				{BROWSERS.map(browser => (
					<button key={browser} className={`but_2 br_1px_dark`} onClick={() => onBrowserClick(browser)}>
						{browser}
					</button>
				))}
			</div>
		</div>
	);
}
