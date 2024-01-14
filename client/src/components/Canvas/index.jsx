import React, { useEffect, useRef } from 'react';
import style from './style.module.scss';

import drawCanvas from '../../utils/drawCanvas';

import config from '../../../config';

const Canvas = ({ elements, canvasRef }) => {
	// console.log('canvas');
	const ctx = useRef(null);

	useEffect(() => {
		// Destructure the refs to improve readability
		const canvas = canvasRef.current;
		ctx.current = canvas.getContext('2d');

		const resolution = config.canvadResolution || 1024;
		const ratio = config.canvasRatio || 1.5;

		function setSize() {
			// Calculate dimensions based on the viewport
			let height = window.innerHeight * 0.8;
			if (window.innerWidth < height * ratio)
				height = (window.innerWidth * 0.9) / ratio;
			const width = height * ratio;

			canvas.height = resolution;
			canvas.width = resolution * ratio;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;

			drawCanvas.clearCanvas(canvasRef.current);
			drawCanvas.drawAllElement(canvasRef.current, elements);
			// console.log('resized');
		}

		// Initial setup
		setSize();
		window.addEventListener('resize', setSize);

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener('resize', setSize);
		};
	}, []);

	useEffect(() => {
		drawCanvas.clearCanvas(canvasRef.current);
		drawCanvas.drawAllElement(canvasRef.current, elements);
	}, [elements]);

	return (
		<canvas
			className={style.canvas}
			ref={canvasRef}>
			Your browser does not support the HTML5 canvas tag.
		</canvas>
	);
};

export default Canvas;
