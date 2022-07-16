import * as React from "react"
import { useSearchContext } from '@sajari/react-hooks';

import {
  FieldDictionary,
  FilterBuilder,
  Filter,
  Input,
  Pagination,
  Pipeline,
  RangeFilterBuilder,
  Results,
  ResultsPerPage,
  SearchProvider,
  Sorting,
  Summary,
  ViewType,
} from '@sajari/react-search-ui';

export function Search() {
  const pipeline = new Pipeline(
	{
	  account: '1657965761834578934',
	  collection: 'canidev-tools',
	},
	'website',
  );

  const fields = new FieldDictionary({
	title: 'title',
	description: 'description',
	url: 'url'
  });

  const App = React.memo(() => {
	const { searched } = useSearchContext();

	return (
	  <div className="d_flex fd_col gap_1em">
		<Input mode="suggestions" enableVoice={true} showDropdownTips={true} />
		<div className="d_flex jc_sb">
			<Summary />
			<ResultsPerPage label="" size="sm" />
		</div>
		<div style={{ overflow: "scroll", maxHeight: "50vh" }}>
		<Results appearance="list" openNewTab={true} showImage={false} resultTemplate={{
			html: `
				<a href="{{url}}" target="_blank" class="search">
					<div class="p_05em">
						<div class="fw_bold">{{title}}</div>
						<div class="fs_12px c_9ab">{{url.slice(25)}}</div>
						<div>{{description}}</div>
					</div>
				</a>
			`
		}} />
		</div>
		<div className="pos_sticky bot_0 p-6">
		  <Pagination />
		</div>	  </div>
	);
  });

  return (
	<SearchProvider
	  search={{
		pipeline,
		fields,
	  }}
	  searchOnLoad
	>
	  <App />
	</SearchProvider>
  );
}