import React from 'react';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
//delete icon
import { FaTrash } from 'react-icons/fa';

const Rooms = ({ rooms, deleteRoom }) => {
	// console.log(rooms);
	const navigate = useNavigate();

	if (rooms.length === 0)
		return (
			<div
				className={style.room}
				style={{ textAlign: 'center' }}>
				<i>No Rooms to show</i>
			</div>
		);
	return (
		<ul className={style.room}>
			{rooms.map((room) => {
				return (
					<li
						key={room._id}
						onClick={() => {
							navigate(`/room/${room.roomId}`);
						}}>
						<p className={style.name}>{room.name}</p>
						<p className={style.id}>
							{room.roomId}{' '}
							<FaTrash
								className={style.icon}
								onClick={(e) => {
									e.stopPropagation();
									deleteRoom(room.roomId);
								}}
							/>
						</p>
					</li>
				);
			})}
		</ul>
	);
};

export default Rooms;
