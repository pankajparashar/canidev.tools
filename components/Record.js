import { useEffect, useRef, useState } from "react";
import { Details } from "./Details";

import { BROWSERS } from "../lib/fetch";

export function Record({ record, color }) {
	const [details, setDetails] = useState(null);
	const [activeBrowser, setActiveBrowser] = useState();
	const [isFavorite, setIsFavorite] = useState(false);

	const { fields } = record;
	const { Slug } = fields;

	const onClick = async (Browser) => {
		setDetails((prevDetails) => {
			const details = {
				...fields[Browser],
				Browser,
				Slug
			};
			return prevDetails?.Browser === Browser ? null : details;
		});
		setActiveBrowser((prevBrowser) => {
			const url = new URL(window.location.href);
			const params = url.searchParams;

			if (prevBrowser === Browser) {
				params.delete("id");
				params.delete("browser");
				document.title = `Can I Devtools?`;
				document.head.querySelector('meta[property="twitter:title"]').content =
					"Can I DevTools?";
				document.head.querySelector('meta[property="twitter:url"]').content =
					"https://canidev.tools/";
			} else {
				params.set("id", Slug);
				params.set("browser", Browser);
				document.title = `${fields.Name} | ${Browser}`;
				document.head.querySelector(
					'meta[property="twitter:title"]'
				).content = `${fields.Name} | ${Browser}`;
				document.head.querySelector('meta[property="twitter:url"]').content =
					window.location.href;
			}

			window.history.pushState({}, fields.Name, url);
			return prevBrowser === Browser ? null : Browser;
		});
	};

	useEffect(() => {
		const favorites = new Set(
			JSON.parse(window.localStorage.getItem("cid_Favorites") || "[]")
		);
		setIsFavorite(favorites.has(record.id));
	}, [record.id]);

	const isMounted = useRef();
	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			const params = new URLSearchParams(window.location.search);
			const id = params.get("id");
			const browser = params.get("browser");

			if (id === record.id || id === Slug && browser) {
				onClick(browser);
			}
		}
	});

	const onFavorite = () => {
		setIsFavorite(!isFavorite);

		let favorites = localStorage.getItem("cid_Favorites") || "[]";
		favorites = new Set(JSON.parse(favorites));

		if (favorites.has(record.id)) {
			favorites.delete(record.id);
		} else {
			favorites.add(record.id);
		}

		localStorage.setItem("cid_Favorites", JSON.stringify([...favorites]));
	};

	return (
		<>
			<div
				key={record.id}
				className={`d_grid gtc_320px`}
				id={Slug || record.id}
				style={{ borderLeft: `.25em solid ${color}` }}
			>
				<div className={`p_05em br_1px bb_1px pl_0`} data-color={color}>
					<button
						aria-label="Set as Favorite"
						title="Set as Favorite"
						style={{
							width: "auto",
							outline: "0px solid",
							textAlign: "left",
							padding: "0 .5em"
						}}
						onClick={onFavorite}
					>
						{isFavorite ? <Favorite /> : <NoFavorite />}
					</button>
					{fields.Name}
				</div>
				<div className={`d_grid gtc_5fr mh_3em`}>
					{BROWSERS.map((browser) => {
						return (
							<div key={record.id + browser} className={`br_1px`}>
								<button
									aria-label="Exists or not"
									disabled={!Boolean(fields[browser])}
									className={`p_05em but_1 ${activeBrowser === browser ? "bgc_light" : "bb_1px"
										}`}
									data-goatcounter-click={`id=${Slug}&browser=${browser}`}
									data-goatcounter-title={fields.Name + " / " + browser}
									onClick={() => onClick(browser)}
								>
									{fields[browser] ? (
										<Yes color={color} />
									) : (
										<No color={color} />
									)}
								</button>
							</div>
						);
					})}
				</div>
			</div>
			{details ? <Details details={details} id={Slug || record.id} /> : null}
		</>
	);
}

const Yes = ({ color }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		x="0px"
		y="0px"
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill={color}
	>
		<path d="M 3 3 L 3 21 L 21 21 L 21 13 L 21 6.4140625 L 11 16.414062 L 6.2929688 11.707031 L 7.7070312 10.292969 L 11 13.585938 L 21 3.5859375 L 21 3 L 3 3 z"></path>
	</svg>
);

const No = ({ color }) => (
	<svg
		version="1.0"
		xmlns="http://www.w3.org/2000/svg"
		x="0px"
		y="0px"
		width="18"
		height="18"
		viewBox="0 0 96 96"
		fill={color}
	>
		<g
			transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
			stroke="none"
		>
			<path
				d="M150 480 l0 -330 330 0 330 0 0 330 0 330 -330 0 -330 0 0 -330z
m600 0 l0 -270 -270 0 -270 0 0 270 0 270 270 0 270 0 0 -270z"
			/>
			<path d="M270 480 l0 -30 210 0 210 0 0 30 0 30 -210 0 -210 0 0 -30z" />
		</g>
	</svg>
);

const NoFavorite = () => (
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 226 226"
		width="16"
		height="16"
	>
		<g
			fill="none"
			fillRule="nonzero"
			stroke="none"
			strokeWidth="1"
			strokeLinecap="butt"
			strokeLinejoin="miter"
			strokeMiterlimit="10"
			strokeDasharray=""
			strokeDashoffset="0"
			fontFamily="none"
			fontWeight="none"
			fontSize="none"
			textAnchor="none"
		>
			<path d="M0,226v-226h226v226z" fill="none"></path>
			<g fill="#99aabb">
				<path d="M113,4.52c-1.86473,0.00162 -3.53712,1.14809 -4.21102,2.8868l-27.87039,71.85211l-76.62813,3.91086c-1.86719,0.09451 -3.48354,1.32871 -4.06653,3.10506c-0.58299,1.77636 -0.01231,3.72832 1.43575,4.91087l59.6693,48.78422l-19.59844,74.02383c-0.4789,1.80371 0.19982,3.71631 1.70858,4.81466c1.50876,1.09835 3.53739,1.15664 5.10673,0.14675l64.45414,-41.36859l64.45414,41.36859c1.56934,1.00989 3.59797,0.9516 5.10673,-0.14675c1.50876,-1.09835 2.18749,-3.01095 1.70858,-4.81466l-19.59844,-74.02383l59.66929,-48.78422c1.44806,-1.18256 2.01874,-3.13452 1.43575,-4.91087c-0.58299,-1.77636 -2.19934,-3.01055 -4.06653,-3.10506l-76.62812,-3.91086l-27.87039,-71.85211c-0.6739,-1.7387 -2.34628,-2.88518 -4.21102,-2.8868zM113,21.5318l24.70992,63.72141c0.64587,1.66252 2.20892,2.78985 3.99031,2.87797l67.84414,3.46945l-52.84516,43.21367c-1.3712,1.12114 -1.96132,2.93979 -1.50961,4.65242l17.36492,65.6018l-57.10914,-36.66321c-1.48951,-0.95805 -3.40128,-0.95805 -4.89078,0l-57.10914,36.66321l17.36492,-65.6018c0.45171,-1.71263 -0.13841,-3.53128 -1.50961,-4.65242l-52.84516,-43.21367l67.84414,-3.46945c1.78139,-0.08812 3.34444,-1.21545 3.99031,-2.87797z"></path>
			</g>
		</g>
	</svg>
);

const Favorite = () => (
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 226 226"
		width="16"
		height="16"
	>
		<g
			fill="none"
			fillRule="nonzero"
			stroke="none"
			strokeWidth="1"
			strokeLinecap="butt"
			strokeLinejoin="miter"
			strokeMiterlimit="10"
			strokeDasharray=""
			strokeDashoffset="0"
			fontFamily="none"
			fontWeight="none"
			fontSize="none"
			textAnchor="none"
		>
			<path d="M0,226v-226h226v226z" fill="none"></path>
			<g fill="#f1c40f">
				<path d="M46.104,219.672c-0.904,0 -1.808,-0.452 -2.712,-0.904c-1.356,-0.904 -2.26,-3.164 -1.808,-4.972l19.888,-74.128l-59.664,-48.364c-1.808,-0.904 -2.26,-3.164 -1.808,-4.972c0.452,-1.808 2.26,-3.164 4.068,-3.164l76.84,-4.068l27.572,-71.868c0.904,-1.356 2.712,-2.712 4.52,-2.712c1.808,0 3.616,1.356 4.068,2.712l27.572,71.868l76.84,4.068c1.808,0 3.616,1.356 4.068,3.164c0.452,1.808 0,3.616 -1.356,4.972l-59.664,48.364l19.888,74.128c0.452,1.808 0,3.616 -1.808,4.972c-1.356,0.904 -3.616,1.356 -4.972,0l-64.636,-41.584l-64.636,41.584c-0.904,0.904 -1.356,0.904 -2.26,0.904z"></path>
			</g>
		</g>
	</svg>
);
