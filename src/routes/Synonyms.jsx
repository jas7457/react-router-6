import React from 'react';
import { defer } from 'react-router-dom';

/**
 * A lazyily loaded component for the Synonyms page.
 * Artificially delayed by 3 seconds to simulate network latency.
 */
export const Synonyms = React.lazy(() => {
	console.log('Starting to fetch the Synonyms component code...');
	return import('./SynonymsLazy').then((def) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log('Finished fetching the Synonyms component code.');
				resolve(def);
			}, 3000);
		});
	});
});

/**
 * This would be our skeleton page for synonyms.
 * It would show both while the dynamic SynonymsLazy component is being loaded AND while the data is being fetched.
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
 * This would be the function that loads data for boosts. Think of this as our `useQuery` hook.
 * We'd be unable to use hooks in this, so we'd likely have to make graphql client calls directly (which we already do in some cases).
 * I've set an arbitrary timeout of 1 second to represent network latency.
 */
export function synonymsLoader() {
	console.log('Starting to fetch the synonyms data');

	const promise = new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					synonyms: [
						{ id: 1, text: 'synonym 1' },
						{ id: 2, text: 'synonym 2' },
						{ id: 3, text: 'synonym 3' },
						{ id: 4, text: 'synonym 4' },
					],
				}),
			1000
		);
	}).then((data) => {
		console.log('Done fetching the synonyms data');
		return data;
	});

	return defer({ data: promise });
}
