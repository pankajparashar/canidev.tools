import * as fs from "fs"
import path from "path"

import { useState } from "react";
import Head from "next/head"

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Category } from "../components/Category";
import { Favorites } from "../components/Favorites";

export async function getStaticProps() {
	const records = []
	fs.readdirSync("features").forEach(name => {
		const filename = path.join("features", name)
		const file = fs.readFileSync(filename)
		const record = JSON.parse(file)
		records.push(record)
	})
		
	return {
		props: { records },
		revalidate: 10
	};
}

function groupByCategory(records) {
	const categories = {};
	records.forEach((record) => {
		const category = record.fields.Category;
		if (category in categories) {
			categories[category].push(record);
		} else {
			categories[category] = [record];
		}
	});
	return categories;
}

export default function IndexPage(props) {
	const [records, setRecords] = useState(props.records);
	const [showFavorites, setShowFavorites] = useState(true)

	const colors = [
		"#d50000", // red
		"#aa00ff", // purple
		"#f57c00", // orange
		"#019267", // green
		"#f50057", // pink
		"#00ced1", // darkturquoise
		"#2962ff", // blue
		"#5d4037", // brown
		"#0d8091" // cyan
	];
	const categories = groupByCategory(props.records);

	return (
		<>
			<Header records={records} />
			{showFavorites ? <Favorites records={records} /> : null}
			{Object.entries(categories).map(([category, records], idx) => (
				<Category
					key={category}
					category={category}
					records={records}
					color={colors[idx]}
				/>
			))}
			<Footer />
		</>
	);
}
