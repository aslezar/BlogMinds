import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../Button';
import style from './style.module.scss';
import * as api from '../../api/index.js';

const CreateRoom = () => {
	const [roomName, setRoomName] = useState('');
	const [buttonClicked, setButtonClicked] = useState(false);

	const navigate = useNavigate();

	const { isSignedIn } = useGlobalContext();

	const CreateRoom = async (e) => {
		e.preventDefault();
		if (buttonClicked) return;
		if (!isSignedIn) return toast.error('Please Sign In to create a room.');
		if (!roomName) return toast.error('Please enter a room name.');
		setButtonClicked(true);
		api.handler(
			api.createRoom,
			(data) => {
				//copy room id to clipboard
				// navigator.clipboard.writeText(data.roomId);
				navigator.clipboard.writeText(
					window.location.origin + `/room/${data.roomId}`
				);
				navigate(`/room/${data.roomId}`);
			},
			roomName
		);
		setButtonClicked(false);
	};
	return (
		<div className={style.wrapper}>
			<h1 className={style.heading}>Create Room</h1>
			<form
				action=''
				onSubmit={CreateRoom}
				className={style.form}>
				<div className={style.inputContainer}>
					<input
						id='roomName'
						onChange={(e) => setRoomName(e.target.value)}
						type='text'
						placeholder='Enter room name... '
						value={roomName}
					/>
				</div>
				<div className={style.actoinContainer}>
					<Button>Create Room</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateRoom;
