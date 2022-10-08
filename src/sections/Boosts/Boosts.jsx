import React from 'react';
import { defer } from 'react-router-dom';

import { sleep } from '../../sleep';

/**
 * A lazyily loaded component for the Boosts page.
 * Artificially delayed by 3 seconds to simulate network latency.
 */
export const Boosts = React.lazy(() => {
	console.log('Starting to fetch the Boosts component code...');
	return import('./BoostsLazy').then(async (def) => {
		await sleep(3000);
		console.log('Finished fetching the Boosts component code.');
		return def;
	});
});

/**
 * This would be our skeleton page for boosts.
 * It would show both while the dynamic BoostsLazy component is being loaded OR while the data is being fetched.
 */
export function BoostsSkeleton() {
	return (
		<div>
			<h1>Boosts!</h1>
			<ul>
				{[1, 2, 3, 4].map((num) => (
					<li key={num}>...</li>
				))}
			</ul>
		</div>
	);
}

/**
 * This would be the function that loads data for boosts. Think of this as our `useQuery` hook.
 * We'd be unable to use hooks in this, so we'd likely have to make graphql client calls directly (which we already do in some cases).
 * The use of `defer` here is important. It allows the route transition to happen while data is still loading.
 * Without this, react-router will not transition to the new route until the data is loaded, thus not allowing the skeleton to be shown.
 * https://reactrouter.com/en/main/guides/deferred
 */
export function boostsLoader() {
	return defer({ boosts: getBoosts(), staticText: 'Hello from boosts!' });
}

/**
 * A function to represent grabbing boosts from the network. We'd have to use the graphql client directly here instead of relying on useQuery hooks.
 * I've set an arbitrary timeout of 1 second to represent network latency.
 */
async function getBoosts() {
	console.log('Starting to fetch the boost data');
	await sleep(1000);
	console.log('Done fetching the boost data');
	return [
		{ id: 1, text: 'boost 1' },
		{ id: 2, text: 'boost 2' },
		{ id: 3, text: 'boost 3' },
		{ id: 4, text: 'boost 4' },
	];
}
