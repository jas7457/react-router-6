import { defer } from 'react-router-dom';

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
	});

	promise.then(() => {
		console.log('Done fetching the synonyms data');
	});

	return defer({ data: promise });
}
