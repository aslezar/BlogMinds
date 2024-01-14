import React from 'react';
import Signin from '../Signin';
import Signup from '../Signup';
import PopUp from '../PopUp';
import style from './style.module.scss';
import { useGlobalContext } from '../../context';

const Sign = ({ closeSign, page }) => {
	const [isSignin, setIsSignin] = React.useState(page || 'signin');

	const { isSignedIn } = useGlobalContext();
	if (isSignedIn === true) closeSign();

	const toogleSignIn = (value) => {
		setIsSignin(value);
	};

	if (isSignin === 'signup')
		return (
			<PopUp closeSign={closeSign}>
				<Signup
					toogleSignIn={toogleSignIn}
					closeSign={closeSign}
				/>
			</PopUp>
		);
	else if (isSignin === 'signin')
		return (
			<PopUp closeSign={closeSign}>
				<Signin
					toogleSignIn={toogleSignIn}
					closeSign={closeSign}
				/>
			</PopUp>
		);
	return <div className={style.sign}>Error</div>;
};

export default Sign;
