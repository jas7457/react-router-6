/**
 * You can either throw directly in the render of a component, or in a component's loader function.
 * Either way, it will bubble up to the nearest errorElement in the route config.
 */
export function SometimesErrors() {
	if (Math.random() > 0.5) {
		throw new Error('Sometimes errors');
	}

	return <div>You got lucky, I didn't error this time.</div>;
}
