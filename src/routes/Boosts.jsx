import { defer } from 'react-router-dom';

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
	});

	promise.then(() => {
		console.log('Done fetching the boost data');
	});

	return defer({ data: promise });
}
