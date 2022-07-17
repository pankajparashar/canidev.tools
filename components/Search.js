import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { CategoryColors } from "../lib/fetch"

export function Search(props) {
	const options = {
		includeScore: false,
		minMatchCharLength: 1,
		threshold: 0.25,
		keys: ["fields.Name"]
	};
	const [fuse, setFuse] = useState(new Fuse(props.records, options));
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([])
	
	const onKeyDown = (event) => {
		if (event.keyCode === 27) {
			setResults([])
			setQuery("")
			props.setShowSearch(false)
		} else {
			const q = event.target.value
			setQuery(q)
			const r = fuse.search(q).map((r) => r.item)
			setResults(r)
		}
	};
	
	return (
		<div className="d_flex h_100pct c_000">
			<input 
				autoFocus
				autoComplete="off"
				spellCheck="false"
				autoCapitalize="off"
				autoCorrect="off"
				type="search" 
				className="w_100pct b_0 pl_05em ff_inherit fs_inherit" 
				placeholder="Can I ... ?" 
				onKeyDown={onKeyDown}
			/>
			{query.length > 1 ? 
				<div 
					className="b_1px search" 
					style={{ 
						position: 'absolute',
						top: '100%',
						width: '100%',
						left: 0,
			    		backgroundColor: 'white',
						maxHeight: "50vh",
						overflow: "auto"
				    }}
				>
					{results.map(r => {
						const c = CategoryColors[r.fields.Category]
						return (
							<a href={`/${r.fields.Slug}`} rel="noreferrer" target="_blank">
								<div className="p_05em bb_1px" style={{ borderLeft: `.25em solid ${c}` }}>
									{r.fields.Name} <span>↵</span>
								</div>
							</a>
						)
					})}
					{query.length > 0 ? 
						<a href={`https://github.com/pankajparashar/canidev.tools/issues/new?title=${query}&labels=Add&assignees=pankajparashar`} rel="noreferrer" target="_blank">
							<div className="p_05em bgc_light">+Add New: <strong>{query}</strong></div> 
						</a>
					: null} 
				</div>
			: null}
		</div>	
	)
}