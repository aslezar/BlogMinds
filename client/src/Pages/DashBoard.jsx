import React, { useEffect } from 'react';
import style from './style.module.scss';
import { useGlobalContext } from '../../context';
import * as api from '../api';

import customConfirmation from '../components/customConfirmation';
import CreateRoom from '../components/CreateRoom';
import JoinRoom from '../components/JoinRoom';
import Rooms from '../components/Rooms';
import UserPanel from '../components/UserPanel';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const DashBoard = () => {
	const [myRooms, setMyRooms] = React.useState([]);
	const [otherRooms, setOtherRooms] = React.useState([]);

	const { userId, isSignedIn } = useGlobalContext();

	const fetchRooms = async () => {
		api.handler(
			api.getRooms,
			(data) => {
				setMyRooms(data.myRooms);
				setOtherRooms(data.otherRooms);
			},
			userId
		);
	};

	const handleDeleteMyRoom = async (roomId) => {
		const handler = () => {
			api.handler(
				api.deleteRoom,
				() => {
					setMyRooms((prev) => prev.filter((room) => room.roomId !== roomId));
				},
				roomId
			);
		};
		customConfirmation({
			message: 'Are you sure you want to delete this room?',
			onConfirm: handler,
			toastId: 'roomDelete',
		});
	};
	const handleDeleteOtherRoom = async (roomId) => {
		const handler = () => {
			api.handler(
				api.removeRoom,
				() => {
					setOtherRooms((prev) =>
						prev.filter((room) => room.roomId !== roomId)
					);
				},
				roomId
			);
		};
		customConfirmation({
			message: 'Are you sure you want to remove this room?',
			onConfirm: handler,
			toastId: 'roomDelete',
		});
	};

	useEffect(() => {
		// console.log(userId);
		if (isSignedIn) fetchRooms();
	}, [userId, isSignedIn]);

	if (!isSignedIn)
		return (
			<>
				<div className={`${style.dashbaord}`}>
					<p
						style={{
							fontSize: '2vw',
						}}>
						<i>Sign In to view your dashboard.</i>
						<Link to='/'> Home</Link>
					</p>
				</div>
				<Footer />
			</>
		);

	return (
		<>
			<div className={style.dashbaord}>
				<div className={style.user}>
					<UserPanel />
				</div>
				<div className={style.rooms}>
					<div className={`${style.join}`}>
						<CreateRoom />
						<JoinRoom />
					</div>
					<section className={style.myroom}>
						<h2>My Rooms</h2>
						<Rooms
							rooms={myRooms}
							deleteRoom={handleDeleteMyRoom}
						/>
					</section>
					<section className={style.otherroom}>
						<h2>Other Rooms</h2>
						<Rooms
							rooms={otherRooms}
							deleteRoom={handleDeleteOtherRoom}
						/>
					</section>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default DashBoard;
