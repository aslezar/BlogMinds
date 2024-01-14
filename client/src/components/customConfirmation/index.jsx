import style from './style.module.scss';
import { toast } from 'react-toastify';

const customConfirmation = ({ message, onConfirm, toastId = '1' }) => {
	toast(
		<div>
			<div>{message}</div>
			<button
				onClick={() => {
					toast.dismiss(toastId);
					onConfirm();
				}}
				className={style.btn}>
				Confirm
			</button>
			<button
				onClick={() => {
					toast.dismiss(toastId);
				}}
				className={style.btn}>
				Cancel
			</button>
		</div>,
		{
			toastId: toastId,
			autoClose: false, // Keep the toast open until confirmed or canceled
			closeOnClick: false,
			closeButton: false,
			draggable: true,
		}
	);
};

export default customConfirmation;
