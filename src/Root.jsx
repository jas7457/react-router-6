import { Outlet, NavLink } from 'react-router-dom';

export function Root() {
	return (
		<>
			<div id="sidebar">
				<nav>
					<ul>
						<li>
							<NavLink
								to="/"
								className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}
								end
							>
								Home
							</NavLink>
						</li>
						{[
							{ to: 'synonyms', title: 'Synonyms' },
							{ to: 'boosts', title: 'Boosts' },
							{ to: 'sometimes-errors', title: 'This route sometimes errors' },
							{ to: 'madeup', title: "This route doesn't exist" },
						].map(({ to, title }) => (
							<li key={to}>
								<NavLink
									to={to}
									className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}
								>
									{title}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<div id="detail">
				<Outlet />
			</div>
		</>
	);
}
