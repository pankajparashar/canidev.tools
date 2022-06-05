import { getData } from "../../lib/fetch";

export default async function handler(req, res) {
  let records = await getData();
  records = records.map((r) => r.fields);
  res.status(200).json(records);
}
