import { Record } from "../components/Record";

export function Related(props) {
	const Records = []
	const { Category, Slug } = props.record.fields
	props.records.forEach(r => {
		if(r.fields.Category === Category && r.fields.Slug !== Slug) {
			Records.push(<Record record={r} />)
		}
	})
		
	return (
		<details open>
			<summary className={`p_05em bb_1px pt_2em`}>
				<strong>Related ({Records.length})</strong>
			</summary>
			{Records}
		</details>
	)
}