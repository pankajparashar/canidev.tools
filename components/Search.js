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
		<Results openNewTab={true} showImage={false} resultTemplate={{
			html: `
				<a href="{{url}}" target="_blank" class="search">
					<div class="b_1px p_05em">
						<div class="fw_bold">{{title}}</div>
						<div class="fs_12px c_9ab">{{url.slice(12)}}</div>
						<div>{{description}}</div>
					</div>
				</a>
			`
		}} />
		<Pagination />
	  </div>
	);
  });

  return (
	<SearchProvider
	  viewType="list"
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