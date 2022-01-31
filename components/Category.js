import { Record } from "../components/Record";

export function Category({ category, records, color }) {
  return (
    <details open id={category}>
      <summary className={`p_05em bgc_ws bb_1px pt_2em`}>
        <strong>
          {category} ({records.length})
        </strong>
      </summary>
      {records.map((record) => (
        <Record key={record.id} record={record} color={color} />
      ))}
    </details>
  );
}
