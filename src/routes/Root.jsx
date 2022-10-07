import { Outlet, NavLink } from 'react-router-dom';

export default function Root() {
	return (
		<>
			<div id="sidebar">
				<h1>React Router Contacts</h1>
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
