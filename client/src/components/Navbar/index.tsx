import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

import Sign from "../Sign";
import PopUp from "../PopUp";
import Button from "../Button";
import JoinRoom from "../JoinRoom";

import { FaBars } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
	const [joinRoom, setJoinRoom] = React.useState(false);
	const [rotation, setRotation] = React.useState(0);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const updateScreenWidth = () => {
		setScreenWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener("resize", updateScreenWidth);
		return () => {
			window.removeEventListener("resize", updateScreenWidth);
		};
	}, []);

	const { isSignedIn, name, bio, profileImage, colorMode, toggleColorMode } =
		useGlobalContext();

	const toggleNavBar = () => {
		document.getElementById("navbox").classList.toggle(style.show);
		setRotation(rotation === 0 ? 90 : 0);
	};

	return (
		<>
			{joinRoom && (
				<PopUp
					closeSign={() => {
						setJoinRoom(false);
					}}
				>
					<JoinRoom />
				</PopUp>
			)}
			<nav className={style.nav}>
				<div className={style.navHeader}>
					<button className={style.navToggle} onClick={toggleNavBar}>
						<FaBars
							className={style.icon}
							style={{ transform: `rotate(${rotation}deg)` }}
						/>
					</button>
					<h1>ShareSketch</h1>
				</div>
				<div className={style.action}>
					<div onClick={toggleColorMode}>
						{colorMode === "dark" ? (
							<MdLightMode className={style.icon} />
						) : (
							<MdDarkMode className={style.icon} />
						)}
					</div>

					{screenWidth < 768 ? (
						<div
							id="navbox"
							className={style.navCon}
							onClick={() =>
								document.getElementById("navbox").classList.remove(style.show)
							}
						>
							<div className={style.user}>
								{isSignedIn ? (
									<>
										<img
											src={profileImage ? profileImage : image}
											alt="profile"
											className={style.profileImage}
										/>
										<span>
											<h2>{name}</h2>
											<p>
												{bio &&
													(bio?.length > 100
														? `${bio?.slice(0, 100)}...`
														: bio)}
											</p>
										</span>
									</>
								) : (
									<>
										<Button onClick={() => setSignup(true)}>
											<AiOutlineUserAdd />
											Sign Up
										</Button>
									</>
								)}
							</div>
							<ul className={style.links}>
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/dashboard">DashBoard</Link>
								</li>
								<li onClick={() => setJoinRoom((prev) => !prev)}>Join Room</li>
								<li>
									<Link to="/about">About Us</Link>
								</li>
							</ul>
						</div>
					) : (
						<ul className={style.links}>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/dashboard">DashBoard</Link>
							</li>
							<li onClick={() => setJoinRoom((prev) => !prev)}>Join Room</li>
							<li>
								<Link to="/about">About Us</Link>
							</li>
						</ul>
					)}

					<User />
				</div>
			</nav>
		</>
	);
};

const User = () => {
	const [showSign, setShowSign] = React.useState(false);

	const { isSignedIn, name, signOut, profileImage } = useGlobalContext();

	return (
		<>
			{isSignedIn ? (
				<>
					<img src={profileImage} alt={name} className={style.profileImage} />
					<span>
						<p>{name.split(" ")[0]}</p>
						<button onClick={signOut} className={style.signOutButton}>
							Sign Out
						</button>
					</span>
				</>
			) : (
				<>
					{showSign && (
						<Sign
							closeSign={() => {
								setShowSign(false);
							}}
						/>
					)}
					<Button
						onClick={() => {
							setShowSign(!showSign);
						}}
					>
						<AiOutlineUserAdd />
						Sign Up/Sign In
					</Button>
				</>
			)}
		</>
	);
};

export default Navbar;
