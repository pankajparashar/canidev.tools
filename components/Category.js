import { useEffect, useState } from "react";
import { Record } from "../components/Record";

export function Category({ category, records, color }) {
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    setFavorites(
      new Set(JSON.parse(window.localStorage.getItem("cid_Favorites") || "[]"))
    );
  }, []);

  return (
    <details open>
      <summary className={`p_05em bb_1px pt_2em`}>
        <strong>
          {category} ({records.length})
        </strong>
      </summary>
      {records.map((record) => {
        const isFavorite = favorites.has(record.fields.Slug);
        return (
          <Record
            key={record.fields.Slug}
            record={record}
            color={color}
            isFavorite={isFavorite}
          />
        );
      })}
    </details>
  );
}
