import { BoostsSkeleton } from './Boosts';
import { AsyncData } from '../../AsyncData';

export default function Boosts() {
	return (
		<AsyncData fallback={<BoostsSkeleton />}>
			{({ boosts }) => {
				return (
					<div>
						<h1>Boosts!</h1>
						<ul>
							{boosts.map(({ id, text }) => (
								<li key={id}>{text}</li>
							))}
						</ul>
					</div>
				);
			}}
		</AsyncData>
	);
}
