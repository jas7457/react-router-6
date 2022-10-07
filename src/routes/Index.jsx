import { Link } from 'react-router-dom';

export default function Index() {
	return (
		<div>
			<p>This is a demo and suggested solution to a better loading experience in the Shopify Search & Discovery app.</p>

			<p>
				Let's focus on a single example: The Synonyms page. There is a Route entry in main.jsx that points to synonyms,
				but also defines a `loader` and `element`. Let's dig into these.
			</p>

			<ol>
				<li>
					<p>
						The `element` is a dynamic import for `Synonyms` that is wrapped in a `Suspense` boundary. That means that
						the code for `Synonyms` is dynamically imported when the user clicks on that route. While the code is being
						imported, the `fallback` is shown. For the purposes of this example, I've made the component take 3 seconds
						to load to more easily demonstrate the loading experience. If you click on{' '}
						<Link to="synonyms">Synonyms</Link> you will see it make a network request to load the component code and
						show the fallback for 3 seconds.
					</p>
				</li>
				<li>
					<p>
						The{' '}
						<a href="https://reactrouter.com/en/main/route/loader" target="_blank">
							loader
						</a>{' '}
						defines how to fetch data for that specific route. This is where we could make our graphql calls (although
						we'd have to ditch useQuery) to load our data. I've created an `AsyncData` component to abstract some of
						this away. The idea is that we'd show the SAME skeleton while fetching data and while fetching the component
						itself.
					</p>

					<p>
						Both the data AND the component are loaded in parallel. With this approach of showing the same loading
						skeleton, the user will have the best user experience as they'll see ONE loading screen for both cases, and
						then the resolved UI once both have finished.
					</p>
				</li>
			</ol>

			<p>
				If you open your console, you can see when components vs data are fetched and resolved. Both of these have
				arbitrary timeouts so they take longer to fetch so we can more easily see the flow.
			</p>

			<p>
				`loader`s will be called every time you navigate to a route, but the async component loads will only be called
				for your first visit.
			</p>
		</div>
	);
}
