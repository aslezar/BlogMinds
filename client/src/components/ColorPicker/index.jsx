import React, { useState, useRef } from 'react';
import { ChromePicker } from 'react-color';

function ColorPickerComponent({ color, changeColor }) {
	const [inputColor, setInputColor] = useState(color);
	const [showColorPicker, setShowColorPicker] = useState(false);
	const anchorRef = useRef(null);

	const handleColorChange = (newColor) => {
		const { r, g, b, a } = newColor.rgb;
		const rgbaColor = `rgba(${r}, ${g}, ${b}, ${a})`;
		setInputColor(rgbaColor);
	};
	const handleColorChangeComplete = (newColor) => {
		const { r, g, b, a } = newColor.rgb;
		const rgbaColor = `rgba(${r}, ${g}, ${b}, ${a})`;
		changeColor(rgbaColor);
		toggleColorPicker();
	};

	const toggleColorPicker = () => {
		setShowColorPicker((prevShowColorPicker) => !prevShowColorPicker);
	};

	const colorButtonStyle = {
		backgroundColor: inputColor || 'transparent',
		width: '50px',
	};

	const colorPickerStyle = {
		position: 'absolute',
		top: anchorRef.current
			? anchorRef.current.offsetTop + anchorRef.current.offsetHeight
			: 0,
		left: anchorRef.current
			? anchorRef.current.offsetLeft + anchorRef.current.offsetWidth
			: 0,

		transform: 'translate(0%, -100%)',
		zIndex: 1,
	};
	return (
		<>
			<button
				onClick={toggleColorPicker}
				ref={anchorRef}
				style={colorButtonStyle}
			/>
			{showColorPicker && (
				<div style={colorPickerStyle}>
					<ChromePicker
						color={inputColor}
						onChange={handleColorChange}
						onChangeComplete={handleColorChangeComplete}
					/>
				</div>
			)}
		</>
	);
}

export default ColorPickerComponent;
