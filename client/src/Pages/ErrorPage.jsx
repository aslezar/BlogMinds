import React, { useEffect, useState } from 'react';
import { FaUserSecret } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './style.module.scss';
import Footer from '../components/Footer';

const errorMessages = [
	"Oops, this page seems to have wandered off the beaten path. Let's get you back on track!",
	"Looks like our mischievous cat got to this page before you did. We're working on a solution!",
	"Uh oh, it seems our website's brain is taking a break. We apologize for the inconvenience!",
	'404: Brain Not Found. It seems our neurons are having a coffee break!',
	"Lost in Cyberspace. The page you're looking for might be floating in cyberspace.",
	'404: Page Missing in Action. This page is currently on a secret mission. 🕵️‍♂️',
	"Oops, We Tripped Over a Cable. Our developers may have tripped over a cable. Rest assured, we're untangling things!",
	"404: Quantum Page Entanglement. This page has been caught up in a quantum entanglement. We're working on untangling the code!",
	"Oops, Glitch in the Matrix. There's a glitch in the matrix. Please bear with us as we work on smoothing out the wrinkles!",
	"404: Page on a Coffee Break. The page you're looking for is currently sipping coffee on a well-deserved break. Check back soon!",
	"Oops, Gremlins at Play. It seems mischievous gremlins have been tinkering with our code. We're sending them packing!",
	'404: File Not Found. We searched everywhere, but it seems this page is playing hide and seek.',
	"Oops, We're Lost in Space. Houston, we have a problem. The page you're searching for might be orbiting Jupiter!",
	"404: Data Not Loaded. Our data packets are on vacation. We'll get them back as soon as possible.",
	"Oops, We're Exploring New Frontiers. This page is off exploring uncharted territories. Please stand by!",
	'404: Destination Unknown. This page embarked on a journey and forgot to leave a breadcrumb trail.',
	"Oops, We're in the Upside Down. It appears this page has crossed over into the Upside Down. We're working on the portal!",
	'404: Page Vanished. This page seems to have vanished into thin air. Our detective bots are on the case!',
	"Oops, Time Travel Glitch. We've encountered a time travel glitch, and this page got lost in the temporal rift.",
];
const funnyErrorMessages = [
	'Humor not found.',
	'Press F to pay respects.',
	'Between keyboard and chair.',
	'Glitch detected in brain.exe.',
	'Out of coffee. Brain malfunction.',
	'Reality.exe has stopped responding.',
	'404: Sense of direction not found.',
	'Cannot divide by zero humor.',
	'ID10T error. Consult mirror for fix.',
	'Laugh track malfunction. Awkward silence engaged.',
	'You found me! 🤫',
	'Ouch!!! That hurts.',
];

const getRandomErrorMessage = () => {
	const randomIndex = Math.floor(Math.random() * errorMessages.length);
	return errorMessages[randomIndex];
};
const getRandomFunnyErrorMessage = () => {
	const randomIndex = Math.floor(Math.random() * funnyErrorMessages.length);
	return funnyErrorMessages[randomIndex];
};
const errorMessage = getRandomErrorMessage();

const ErrorPage = () => {
	const [click, setClick] = useState(0);
	const [iconScale, setIconScale] = useState(1);

	useEffect(() => {
		toast.info('Chla Jaa, yha se', {
			toastId: 'msg',
		});
	}, []);

	return (
		<>
			<div className={style.errorContainer}>
				<div
					className={`${style.incognitoIcon}`}
					style={{ transform: `scale(${iconScale})` }}>
					<FaUserSecret
						onMouseEnter={() => {
							toast.info('Hey, move your cursor away', {
								toastId: 'mouseEnter',
							});
							setIconScale(iconScale * 0.8);
						}}
						onMouseLeave={() => {
							//Remove mouseEnter Message
							toast.dismiss('mouseEnter');
							toast.info('thank god! bach gya', {
								toastId: 'mouseLeave',
							});
							setIconScale(iconScale / 0.8);
						}}
						onClick={() =>
							setClick((c) => {
								setIconScale(iconScale * 0.8);
								if (c === 3) {
									toast.error("Don't make me angry 😡, move your cursor away");
									toast.error('Go back Home 🏠');
								} else {
									toast.info(getRandomFunnyErrorMessage(), {
										toastId: 'funnyError',
									});
								}
								return c + 1;
							})
						}
					/>
				</div>
				<div className={style.errorHeader}>
					<div className={style.errorText}>Oops!!!</div>
					<div className={style.errorCode}>404 Not Found</div>
				</div>
				<div className={style.errorMessage}>{errorMessage}</div>
				<Link to='/'>
					<button className={style.homeButton}>Go Back to Home</button>
				</Link>
			</div>
			<Footer />
		</>
	);
};

export default ErrorPage;
