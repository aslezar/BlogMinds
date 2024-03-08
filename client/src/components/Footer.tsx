import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-white shadow dark:bg-gray-800  w-full bottom-0">
			<div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
				<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
					© 2024{" "}
					<a
						href="https://flowbite.com/"
						className="hover:underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						BlogMinds™
					</a>
					. All Rights Reserved.
				</span>
				<ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
					<li className="mb-2 md:mb-0">
						<Link to="/about" className="hover:underline me-4 md:me-6">
							About
						</Link>
					</li>
					<li>
						<Link to="/contactus" className="hover:underline">
							Contact Us
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
