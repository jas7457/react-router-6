import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';

import Root from './routes/Root.jsx';
import Index from './routes/Index';
import ErrorPage from './ErrorPage';

import { SynonymsSkeleton, synonymsLoader } from './routes/Synonyms';
import { BoostsSkeleton, boostsLoader } from './routes/Boosts';

const Synonyms = React.lazy(() => {
	console.log('Starting to fetch the Synonyms component code...');
	return import('./routes/SynonymsLazy').then((def) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log('Finished fetching the Synonyms component code.');
				resolve(def);
			}, 3000);
		});
	});
});

const Boosts = React.lazy(() => {
	console.log('Starting to fetch the Boosts component code...');
	return import('./routes/BoostsLazy').then((def) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log('Finished fetching the Boosts component code.');
				resolve(def);
			}, 3000);
		});
	});
});

import './index.css';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />} errorElement={<ErrorPage />}>
			<Route errorElement={<ErrorPage />}>
				<Route index element={<Index />} />
				<Route
					path="synonyms"
					loader={synonymsLoader}
					element={
						<Suspense fallback={<SynonymsSkeleton />}>
							<Synonyms />
						</Suspense>
					}
				/>
				<Route
					path="boosts"
					loader={boostsLoader}
					element={
						<Suspense fallback={<BoostsSkeleton />}>
							<Boosts />
						</Suspense>
					}
				/>
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
