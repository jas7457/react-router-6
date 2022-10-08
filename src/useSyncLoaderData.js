import { useLoaderData } from 'react-router-dom';

/**
 * This hook tries to get around the need of the Await component described here: https://reactrouter.com/en/main/guides/deferred
 * The idea is largely stolen from react-router's AwaitErrorBoundary, which is what Await and useAsyncValue rely on
 *
 * AwaitErrorBoundary code: https://github.com/remix-run/react-router/blob/main/packages/react-router/lib/components.tsx#L446
 * useAsyncValue description: https://reactrouter.com/en/main/hooks/use-async-value
 */
export function useSyncLoaderData() {
	const loaderData = useLoaderData();

	const isPromise = (data) => data instanceof Promise;

	Object.values(loaderData).forEach((data) => {
		if (!isPromise(data)) {
			return;
		}

		if (!data._tracked) {
			Object.defineProperty(data, '_tracked', { get: () => true });

			data.then(
				(val) => {
					Object.defineProperty(data, '_data', { get: () => val });
				},
				(err) => {
					Object.defineProperty(data, '_error', { get: () => err });
				}
			);
		}
	});

	const error = (() => {
		for (const data of Object.values(loaderData)) {
			if (!isPromise(data)) {
				continue;
			}
			if (data._error !== undefined) {
				return data._error;
			}
		}
	})();

	if (error) {
		throw error;
	}

	const isAllDataLoaded = Object.values(loaderData).every((data) => {
		if (!isPromise(data)) {
			return true;
		}
		return data._data !== undefined;
	});

	if (isAllDataLoaded) {
		return Object.entries(loaderData).reduce((acc, [key, data]) => {
			return { ...acc, [key]: isPromise(data) ? data._data : data };
		}, {});
	}

	// suspend to the next Suspense boundary
	throw Promise.all(Object.values(loaderData));
}
