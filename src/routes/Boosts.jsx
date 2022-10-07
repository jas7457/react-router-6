import { defer } from 'react-router-dom';

/**
 * This would be our skeleton page for boosts.
 * It would show both while the dynamic BoostsLazy component is being loaded AND while the data is being fetched.
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
 * I've set an arbitrary timeout of 1 second to represent network latency.
 */
export function boostsLoader() {
	console.log('Starting to fetch the boost data');

	const promise = new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					boosts: [
						{ id: 1, text: 'boost 1' },
						{ id: 2, text: 'boost 2' },
						{ id: 3, text: 'boost 3' },
						{ id: 4, text: 'boost 4' },
					],
				}),
			1000
		);
	}).then((data) => {
		console.log('Done fetching the boost data');
		return data;
	});

	return defer({ data: promise });
}
