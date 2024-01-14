import React, { useEffect, useRef, useState } from 'react';

import drawCanvas from '../../utils/drawCanvas';

import { toast } from 'react-toastify';

const CanvasUpper = ({ canvasRef, toolbox, addElement }) => {
	// console.log('canvas upper');
	const [isDrawing, setIsDrawing] = useState(false);

	const [curElement, setCurElement] = useState({});

	const canvasUpperRef = useRef(null);
	const scaleRef = useRef(null);

	useEffect(() => {
		// Destructure the refs to improve readability
		const canvas = canvasUpperRef.current;

		function setSize() {
			scaleRef.current =
				canvasRef.current.height / parseInt(canvasRef.current.style.height);

			canvas.width = canvasRef.current.width;
			canvas.height = canvasRef.current.height;

			canvas.style.width = canvasRef.current.style.width;
			canvas.style.height = canvasRef.current.style.height;

			canvas.style.position = 'fixed';
			canvas.style.top = canvasRef.current.offsetTop + 'px';
			canvas.style.left = canvasRef.current.offsetLeft + 'px';
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
		if (curElement.tool) {
			drawCanvas.clearCanvas(canvasUpperRef.current);
			drawCanvas.drawElement(canvasUpperRef.current, curElement);
		}
	}, [curElement]);

	//Helper function
	const getCoordinatedFromEvent = (e) => {
		e.preventDefault();
		console.log(e.type);
		if (e.type.startsWith('touch')) {
			const { pageX, pageY } = e.changedTouches[0];
			const rect = canvasUpperRef.current.getBoundingClientRect();
			const x = (pageX - rect.left) * scaleRef.current;
			const y = (pageY - rect.top) * scaleRef.current;
			return [x, y];
		}
		const { clientX, clientY } = e;
		const rect = canvasUpperRef.current.getBoundingClientRect();
		const x = (clientX - rect.left) * scaleRef.current;
		const y = (clientY - rect.top) * scaleRef.current;
		return [x, y];
	};

	//Handle mouse events
	const handleMouseDown = (e) => {
		const [x, y] = getCoordinatedFromEvent(e);

		const element = {
			...toolbox,
			x,
			y,
		};

		switch (toolbox.tool) {
			case 'pencil':
				setCurElement({ ...element, path: [[x, y]] });
				break;
			case 'circle':
				setCurElement({ ...element, x2: x, y2: y });
				break;
			default:
				setCurElement({ ...element, width: 0, height: 0 });
				break;
		}
		setIsDrawing(true);
	};
	const handleMouseMove = (e) => {
		if (!isDrawing) return;
		const [x, y] = getCoordinatedFromEvent(e);
		switch (toolbox.tool) {
			case 'pencil':
				setCurElement((prevState) => {
					return {
						...prevState,
						path: [...prevState.path, [x, y]],
					};
				});
				break;
			case 'line':
				setCurElement((prevState) => {
					return {
						...prevState,
						x2: x,
						y2: y,
					};
				});
				break;
			case 'rectangle':
				setCurElement((prevState) => {
					const width = x - prevState.x;
					const height = y - prevState.y;
					return {
						...prevState,
						width,
						height,
					};
				});
				break;
			case 'circle':
				setCurElement((prevState) => {
					const width = x - prevState.x;
					const height = y - prevState.y;
					return {
						...prevState,
						x2: x,
						y2: y,
					};
				});
				break;
			default:
				console.error(`Error Occured unknown tool value ${element.tool}`);
		}
	};
	const handleMouseUp = (e) => {
		setIsDrawing(false);
		addElement(curElement);
		drawCanvas.clearCanvas(canvasUpperRef.current);
		setCurElement({});
	};
	const handleMouseLeave = (e) => {
		setIsDrawing(false);
		drawCanvas.clearCanvas(canvasUpperRef.current);
		setCurElement({});
	};
	const handleTouch = (e) => {
		// e.preventDefault();
		// toast.info('You touched');
		// console.log(e);
		// console.log(e.changedTouches.TouchList[0]);
		// console.log(e.clientX, e.clientY);
		// console.log(e._reactName);
		// console.log(e.touches);
		// handleMouseDown(e.touches);
		e.preventDefault();

		// Get information about the touch event
		const { pageX, pageY } = e.changedTouches[0]; // Get the first touch in the list

		// You can now use touchX and touchY as needed
		console.log('Touch started at:', pageX, pageY);
	};

	return (
		<canvas
			ref={canvasUpperRef}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onTouchStart={handleMouseDown}
			onTouchEnd={handleMouseUp}
			onTouchMove={handleMouseMove}
			onTouchCancel={handleMouseLeave}
		/>
	);
};

export default CanvasUpper;
