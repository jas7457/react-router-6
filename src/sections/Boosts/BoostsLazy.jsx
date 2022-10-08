import { useState } from 'react';
import { useSyncLoaderData } from '../../useSyncLoaderData';

export default function Boosts() {
	console.log('Rendering Boosts');

	// using my custom `useSyncLoaderData` so we can treat this like synchronous code and not have to use the Await component
	// https://reactrouter.com/en/main/guides/deferred#the-solution
	const { boosts: serverBoosts, staticText } = useSyncLoaderData();
	console.log('Received loader data for boosts');
	const [boosts, setBoosts] = useState(serverBoosts);

	return (
		<div>
			<h1>Boosts!</h1>
			<p>{staticText}</p>
			<ul>
				{boosts.map(({ id, text }) => (
					<li key={id} style={{ display: 'flex', gap: '1rem' }}>
						{text}
						<button onClick={() => setBoosts(boosts.filter((b) => b.id !== id))}>X</button>
					</li>
				))}
			</ul>
		</div>
	);
}
