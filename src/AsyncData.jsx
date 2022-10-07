import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

// abstraction around https://reactrouter.com/en/main/start/overview#skeleton-ui-with-suspense
export function AsyncData({ fallback, children }) {
	const { data } = useLoaderData();
	return (
		<Suspense fallback={fallback}>
			<Await resolve={data}>{(resolvedData) => children(resolvedData)}</Await>
		</Suspense>
	);
}
