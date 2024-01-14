import style from './style.module.scss';
import {
	FaTwitter,
	FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaGithub,
} from 'react-icons/fa';
import data from '../../../data';
function SocailIcons() {
	const socials = data.socials;
	return (
		<ul className={style.socialIcons}>
			{socials.twitter && (
				<li>
					<a href={socials.twitter}>
						<FaTwitter className={style.icon} />
					</a>
				</li>
			)}
			{socials.facebook && (
				<li>
					<a href={socials.facebook}>
						<FaFacebook className={style.icon} />
					</a>
				</li>
			)}
			{socials.instagram && (
				<li>
					<a href={socials.instagram}>
						<FaInstagram className={style.icon} />
					</a>
				</li>
			)}
			{socials.linkedin && (
				<li>
					<a href={socials.linkedin}>
						<FaLinkedin className={style.icon} />
					</a>
				</li>
			)}
			{socials.github && (
				<li>
					<a href={socials.github}>
						<FaGithub className={style.icon} />
					</a>
				</li>
			)}
		</ul>
	);
}
export default SocailIcons;
