import React from 'react';
import { defer } from 'react-router-dom';

import { sleep } from '../../sleep';

/**
 * A lazyily loaded component for the Synonyms page.
 * Artificially delayed by 3 seconds to simulate network latency.
 */
export const Synonyms = React.lazy(() => {
	console.log('Starting to fetch the Synonyms component code...');
	return import('./SynonymsLazy').then(async (def) => {
		await sleep(3000);
		console.log('Finished fetching the Synonyms component code.');
		return def;
	});
});

/**
 * This would be our skeleton page for synonyms.
 * It would show both while the dynamic SynonymsLazy component is being loaded OR while the data is being fetched.
 */
export function SynonymsSkeleton() {
	return (
		<div>
			<h1>Synonyms!</h1>
			<ul>
				{[1, 2, 3, 4].map((num) => (
					<li key={num}>...</li>
				))}
			</ul>
		</div>
	);
}

/**
 * This would be the function that loads data for synonyms. Think of this as our `useQuery` hook.
 * We'd be unable to use hooks in this, so we'd likely have to make graphql client calls directly (which we already do in some cases).
 * The use of `defer` here is important. It allows the route transition to happen while data is still loading.
 * Without this, react-router will not transition to the new route until the data is loaded, thus not allowing the skeleton to be shown.
 * https://reactrouter.com/en/main/guides/deferred
 */
export function synonymsLoader() {
	return defer({ synonyms: getSynonyms(), staticText: 'Hello from synonyms!' });
}

/**
 * A function to represent grabbing synonyms from the network. We'd have to use the graphql client directly here instead of relying on useQuery hooks.
 * I've set an arbitrary timeout of 1 second to represent network latency.
 */
async function getSynonyms() {
	console.log('Starting to fetch the synonyms data');
	await sleep(1000);
	console.log('Done fetching the synonyms data');
	return [
		{ id: 1, text: 'synonym 1' },
		{ id: 2, text: 'synonym 2' },
		{ id: 3, text: 'synonym 3' },
		{ id: 4, text: 'synonym 4' },
	];
}
