import { IoCloseCircle } from 'react-icons/io5';
import style from './style.module.scss';

const PopUp = ({ closeSign, children }) => {
	const handleClose = (e) => {
		e.stopPropagation();
		if (e.target.id !== 'cover') return;
		closeSign();
	};
	return (
		<div
			onClick={handleClose}
			id='cover'
			className={style.cover}>
			<div className={style.popup}>
				<IoCloseCircle
					onClick={closeSign}
					className={style.close}
				/>
				{children}
			</div>
		</div>
	);
};
export default PopUp;
