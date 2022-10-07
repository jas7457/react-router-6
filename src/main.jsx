import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';

import Root, { rootLoader, rootAction } from './routes/Root.jsx';
import Contact, { contactLoader, contactAction } from './routes/Contact.jsx';
import EditContact, { editContactAction } from './routes/EditContact.jsx';
import { destroyContactAction } from './routes/DestroyContact.jsx';
import Index from './routes/Index';
import ErrorPage from './ErrorPage';
import './index.css';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />} loader={rootLoader} action={rootAction} errorElement={<ErrorPage />}>
			<Route errorElement={<ErrorPage />}>
				<Route index element={<Index />} />
				<Route path="contacts/:contactId" element={<Contact />} loader={contactLoader} action={contactAction} />
				<Route
					path="contacts/:contactId/edit"
					element={<EditContact />}
					loader={contactLoader}
					action={editContactAction}
				/>
				<Route path="contacts/:contactId/destroy" action={destroyContactAction} />
			</Route>
		</Route>
	)
);

/*
const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{ index: true, element: <Index /> },
					{
						path: 'contacts/:contactId',
						element: <Contact />,
						loader: contactLoader,
						action: contactAction,
					},
					{
						path: 'contacts/:contactId/edit',
						element: <EditContact />,
						loader: contactLoader,
						action: editContactAction,
					},
					{
						path: 'contacts/:contactId/destroy',
						action: destroyContactAction,
						errorElement: <div>Oops! There was an error.</div>,
					},
				],
			},
		],
	},
]);
*/

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
