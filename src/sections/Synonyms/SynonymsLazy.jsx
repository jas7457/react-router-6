import { SynonymsSkeleton } from './Synonyms';
import { AsyncData } from '../../AsyncData';

export default function Synonyms() {
	return (
		<AsyncData fallback={<SynonymsSkeleton />}>
			{({ synonyms }) => {
				return (
					<div>
						<h1>Synonyms!</h1>
						<ul>
							{synonyms.map(({ id, text }) => (
								<li key={id}>{text}</li>
							))}
						</ul>
					</div>
				);
			}}
		</AsyncData>
	);
}
