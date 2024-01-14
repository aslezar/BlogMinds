import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../Button';
import style from './style.module.scss';
import * as api from '../../api/index.js';
import { toast } from 'react-toastify';
const JoinRoom = () => {
	const [roomId, setRoomId] = useState('');
	const navigate = useNavigate();

	const joinRoom = async (e) => {
		e.preventDefault();
		if (!roomId) return toast.info('Please enter a room ID');
		api.handler(
			api.isRoomIdValid,
			(data) => {
				navigate(`/room/${roomId}`);
			},
			roomId
		);
	};
	return (
		<div className={style.wrapper}>
			<h1 className={style.heading}>Join Room</h1>
			<form
				action=''
				onSubmit={joinRoom}
				className={style.form}>
				<div className={style.inputContainer}>
					<input
						name='roomId'
						onChange={(e) => setRoomId(e.target.value)}
						placeholder='Enter room ID to join...'
						type='text'
					/>
				</div>
				<div className={style.actoinContainer}>
					<Button>Join Room</Button>
				</div>
			</form>
		</div>
	);
};

export default JoinRoom;
