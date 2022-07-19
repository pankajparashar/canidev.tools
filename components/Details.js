import { marked } from "marked";
import Link from "next/link";
import { useState } from "react";

const Placeholder = props => <div className="d_flex jc_center ai_center bgc_1 h_100pct b_1px_dashed mh_5em"><a
	href={`https://github.com/pankajparashar/canidev.tools/issues/new?&labels=Improve&title=${props.Name}`}
	rel="noreferrer"
	target="_blank"
>
	{props.text}
</a></div>

const Media = props => {
	const defaultType = props.Image ? 
							"png" : props.GIF ? 
								"gif" : props.Video ? "mp4" : null
	const [type, setType] = useState(defaultType)
	const onChange = event => setType(event.target.value)
	
	return (
		<div className="d_flex fd_col gap_5px h_100pct">
			<div className="d_flex jc_sb" onChange={onChange}>		
			  	<label className={type === "png" ? "fw_bold" : ""}><input type="radio" name="png" value="png" checked={type === "png"} />PNG</label>			
			  	<label className={type === "gif" ? "fw_bold" : ""}><input type="radio" id="media" name="gif" value="gif" checked={type === "gif"} />GIF</label>
		  		<label className={type === "mp4" ? "fw_bold" : ""}><input type="radio" name="mp4" value="mp4" checked={type === "mp4"} />MP4</label>
			</div>
			<div className="h_100pct">
				{{
					"png": 
						props.Image ? 
							<img src={props.Image} alt="" className={`b_1px w_100pct`} /> : <Placeholder Name={props.Name} text="+Image" />,
					"mp4":
						props.Video ?
							<video controls preload="metadata">
								<source src={props.Video + "#t=0.1"} type="video/mp4" />
							</video> : <Placeholder Name={props.Name} text="+Video" />,
					"gif":
						props.GIF ?
							<img src={props.GIF} alt="" className={`b_1px w_100pct`} /> : <Placeholder Name={props.Name} text="+GIF" />,
				}[type] || <Placeholder Name={props.Name} text="+Add Media" />}
			</div>
		</div>
	)
}

export function Details({ details, id }) {
	const {
		Video,
		Image,
		GIF,
		Name,
		Notes,
		References,
		Browser,
		Platform,
		Category,
		LastModified,
		Share,
		Version,
		Slug
	} = details;

	const countOfReferences = References
		? (References.match(new RegExp("http", "g")) || []).length
		: 0;
	const params = new URLSearchParams({ text: `${Name} | ${Browser}`, url: `https://canidev.tools/${Slug}/${Browser}`, hashtags: "CanIDevTools", via: "CanIDevTools" })
	const twURL = 'https://twitter.com/intent/tweet?' + params.toString()

	return (
		<div className={`d_grid gtc_320px bgc_light`}>
			<div className={`br_1px bb_1px p_1em`}>
				<Media key={Browser} Name={Name} Video={Video} Image={Image} GIF={GIF} />
			</div>
			<div className={`br_1px bb_1px p_1em`}>
				<details open>
					<summary className={`fw_bold`}>Notes</summary>
					<div
						dangerouslySetInnerHTML={{
							__html: Notes ? marked.parse(Notes) : ""
						}}
					/>
				</details>
				<details>
					<summary className={`fw_bold`}>
						References
						{`(${countOfReferences})`}
					</summary>
					<div
						dangerouslySetInnerHTML={{
							__html: References ? marked.parse(References) : ""
						}}
					/>
				</details>
			</div>
			<div className={`p_1em bb_1px`}>
				<dl>
					<dt className={`fw_bold`}>Browser:</dt>
					<dd className={`mb_1em`}>
						{Browser}
						{Version ? `(${Version})` : null}
					</dd>

					<dt className={`fw_bold`}>Platform:</dt>
					<dd className={`mb_1em`}>{Platform?.map((p) => p).join(", ")}<br />
					</dd>

					<dt className={`fw_bold`}>Category:</dt>
					<dd className={`mb_1em`}>{Category || ""}</dd>

					<dt className={`fw_bold`}>Last Modified:</dt>
					<dd className={`mb_1em`}>
						{new Date(LastModified).toLocaleString()}
					</dd>

					<dt>
						<a
							href={`https://github.com/pankajparashar/canidev.tools/edit/master/features/${Slug}.json`}
							rel="noreferrer"
							target="_blank"
						>
							Edit
						</a>				
						{" ⁝ "}
						<Link
							href={{
								pathname: '[...slug]',
								query: { slug: [Slug, Browser.toLowerCase()] },
							}}
						>
							<a>Link</a>
						</Link>
						{" ⁝ "}
						<a
							href={Share || twURL}
							rel="noreferrer"
							target="_blank"
						>
							Share
						</a>
						<br />
						<a
							href={`https://live.browserstack.com/dashboard`}
							rel="noreferrer"
							target="_blank"
							title="via BrowserStack"
						>
							Test
						</a> {"@"}<strong>BrowserStack</strong>				
					</dt>
				</dl>
			</div>
		</div>
	);
}
