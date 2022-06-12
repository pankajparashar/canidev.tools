import { useEffect, useState } from "react";
import { Record } from "../components/Record";

export function Favorites(props) {
  const category = "Favorites";
  const color = "#f1c40f";
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const newRecords = props.records.filter((r) => props.favorites.has(r.id));
    setRecords(newRecords);
  }, [props.records, props.favorites]);

  return (
    <>
      {records.length > 0 ? (
        <details open id={category}>
          <summary className={`p_05em bgc_ws bb_1px pt_2em`}>
            <strong>
              {category} ({records.length})
            </strong>
          </summary>
          {records.map((record) => (
            <Record
              key={record.id}
              record={record}
              color={color}
              isFavorite={props.favorites.has(record.id)}
            />
          ))}
        </details>
      ) : null}
    </>
  );
}
