import { useEffect, useState } from "react";
import { Record } from "../components/Record";

export function Category({ category, records, color }) {
  const [favorites, setFavorties] = useState(new Set());

  useEffect(() => {
    setFavorties(
      new Set(JSON.parse(window.localStorage.getItem("cid_Favorites") || "[]"))
    );
  }, []);

  return (
    <details open id={category}>
      <summary className={`p_05em bgc_ws bb_1px pt_2em`}>
        <strong>
          {category} ({records.length})
        </strong>
      </summary>
      {records.map((record) => {
        const isFavorite = favorites.has(record.id);
        return (
          <Record
            key={record.id}
            record={record}
            color={color}
            isFavorite={isFavorite}
          />
        );
      })}
    </details>
  );
}
