import { useSyncLoaderData } from '../../useSyncLoaderData';

export default function Synonyms() {
	console.log('Rendering Synonyms');
	const { synonyms, staticText } = useSyncLoaderData();
	console.log('Received loader data for synonyms');

	return (
		<div>
			<h1>Synonyms!</h1>
			<p>{staticText}</p>
			<ul>
				{synonyms.map(({ id, text }) => (
					<li key={id}>{text}</li>
				))}
			</ul>
		</div>
	);
}
