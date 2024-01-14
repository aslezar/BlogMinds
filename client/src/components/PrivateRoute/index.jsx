import { Navigate } from 'react-router-dom';
function Protected({ isSignedIn, children }) {
	if (!isSignedIn) {
		return (
			<Navigate
				to='/'
				replace
			/>
		);
	}
	return children;
}
export default Protected;
