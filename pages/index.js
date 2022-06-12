import { useState } from "react";

import { getData } from "../lib/fetch";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Category } from "../components/Category";
import { Favorites } from "../components/Favorites";

export async function getStaticProps() {
  const records = await getData();
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

  const favorites = new Set(
    JSON.parse(localStorage.getItem("cid_Favorites") || "[]")
  );
  const categories = groupByCategory(props.records.filter((r) => r.display));

  return (
    <>
      <Header records={records} setRecords={setRecords} />
      <Favorites records={records} favorites={favorites} />
      {Object.entries(categories).map(([category, records], idx) => (
        <Category
          key={category}
          category={category}
          records={records}
          color={colors[idx]}
          favorites={favorites}
        />
      ))}
      <Footer />
    </>
  );
}
