import React from 'react';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
//Components
import Sign from '../components/Sign';
import Button from '../components/Button';
import Footer from '../components/Footer';
import JoinRoom from '../components/JoinRoom';
import CreateRoom from '../components/CreateRoom';

//Images
// import imageLight from '../../assets/ShareSketchLight.png';
// import imageDark from '../../assets/ShareSketchDark.png';
import shareSketch from '../../assets/shareSketch.gif';
import image2 from '../../assets/bg1.png';
//Icons
import { useGlobalContext } from '../../context';
import { MdEmojiEmotions } from 'react-icons/md';

const features = [
	{
		title: '🎨 Collaborative Whiteboard',
		description: 'Real-time shared sketching and brainstorming.',
	},
	{
		title: '💬 Group Chat',
		description: 'Organized, productive group conversations.',
	},
	{
		title: '🚀 Effortless Sharing',
		description: 'Seamless sharing of creations and discussions.',
	},
	{
		title: '🌐 Global Collaboration',
		description: 'Connect worldwide, breaking barriers.',
	},
	{
		title: '🔒 Secure and Private',
		description: 'Advanced encryption for data privacy.',
	},
];
//points
const points = [
	'🎨 Create canvas with drawing tools: rectangles, lines, circles, pencils.',
	'🤝 Collaborate remotely via Socket.io: draw, chat, share ideas.',
	'💬 Real-time group chat for instant interaction.',
	'↩️ Undo-redo for correcting drawing mistakes.',
	'🖼️ Profile image upload for personal touch.',
	'✏️ User data editing for easy updates.',
	'🌓 Toggle between dark and light modes.',
	'👥 See list of active users in the room.',
	'👤 Allow guest users to participate.',
];

const Homepage = () => {
	const [signup, setSignup] = React.useState(false);

	const { isSignedIn, name, bio, profileImage, colorMode } = useGlobalContext();
	return (
		<>
			{signup && (
				<Sign
					closeSign={() => setSignup(false)}
					page='signup'
				/>
			)}
			<div className={style.homepage}>
				<header className={style.header}>
					<div className={style.headerContent}>
						<h1>
							Welcome to <b>ShareSketch</b>
							<i>
								An online whiteboard for you and your friends to draw together
							</i>
						</h1>
						<img
							src={image2}
							alt='shareSketch'
						/>
					</div>
				</header>

				<div className={style.featuredBox}>
					{isSignedIn ? (
						<>
							<div className={style.user}>
								<img
									src={profileImage}
									alt='profile'
									className={style.profileImage}
								/>
								<h2>
									<i>Hi, </i>
									{name}
								</h2>
								<p>{bio}</p>
							</div>
							<div className={style.joinroom}>
								<JoinRoom />
								<CreateRoom />
							</div>
						</>
					) : (
						<ul className={style.features}>
							{features.map((feature, index) => (
								<li
									className={style.feature}
									key={index}>
									<h2>{feature.title}</h2>
									<p>{feature.description}</p>
								</li>
							))}
						</ul>
					)}
				</div>
				<section className={style.cta}>
					<h2>Ready to Revolutionize Collaboration?</h2>
				</section>
				<div className={style.demo}>
					<p>Join a demo room now to see how it works.</p>
					<DemoButton />
				</div>
				<div className={style.imageDiv}>
					<img
						// src={colorMode === 'dark' ? imageDark : imageLight}
						src={shareSketch}
						alt='sharesketch'
					/>
				</div>
			</div>
			<Footer />
		</>
	);
};

const DemoButton = () => {
	const navigate = useNavigate();
	return (
		<Button
			onClick={() => {
				navigate('/room/64de0eb4b88c8ea0be3b02ef');
			}}>
			<MdEmojiEmotions />
			Join Demo Room
		</Button>
	);
};

export default Homepage;
