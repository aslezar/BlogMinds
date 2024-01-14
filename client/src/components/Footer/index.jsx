import React from 'react';
import style from './style.module.scss';
import SocaialIcons from '../SocailIcons';
import { BsZoomIn, BsZoomOut } from 'react-icons/bs';
import { useGlobalContext } from '../../context';

const Footer = () => {
	const { zoom, setZoom } = useGlobalContext();

	const zoomIn = () => {
		if (zoom > 1.1) return;
		setZoom((p) => p * 1.01);
	};
	const zoomOut = () => {
		if (zoom < 0.9) return;
		setZoom((p) => p / 1.01);
	};

	return (
		<footer className={style.footer}>
			<p>&copy; 2023 ShareSketch. All rights reserved.</p>
			<b>
				<a
					href='https://github.com/aslezar/ShareSketch'
					target='_blank'>
					Source Code
				</a>
			</b>
			<a
				href='http://www.freepik.com'
				target='_blank'>
				Image Credits
			</a>
			<span>
				<BsZoomIn
					className={style.icon}
					onClick={zoomIn}
					style={zoom > 1.1 && { color: '$textInverse' }}
				/>{' '}
				<BsZoomOut
					className={style.icon}
					onClick={zoomOut}
					style={zoom < 0.9 && { color: '$textInverse' }}
				/>
			</span>
			<SocaialIcons />
		</footer>
	);
};

export default Footer;
