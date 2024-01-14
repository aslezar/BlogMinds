import style from './style.module.scss';

const Button = ({ onClick, children }) => {
	return (
		<button
			onClick={onClick}
			type='submit'
			className={style.btn}>
			{children}
		</button>
	);
};

export default Button;
