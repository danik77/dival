import Image from "next/image";

import style from "./style.module.scss";

const SocialMenu = ({ contacts }) => {
	const { Instagram, Facebook, Behance } = contacts.data.attributes;

	return (
		<div>
			<ul className={style.socialmenu}>
				{Instagram && (
					<li className={style.socialmenu__item}>
						<a href={Instagram}>
							<Image
								src="/images/instagram.svg"
								className={style.socialmenu__image}
								alt="instagram"
								width={23}
								height={23}
							/>
						</a>
					</li>
				)}
					{Facebook && (
					<li className={style.socialmenu__item}>
						<a href={Facebook}>
							<Image
								src="/images/facebook.svg"
								className={style.socialmenu__image}
								alt="facebook"
								width={23}
								height={23}
							/>
						</a>
					</li>
				)}
				{Behance && (
					<li className={style.socialmenu__item}>
						<a href={Behance}>
							<Image
								src="/images/behance.svg"
								className={style.socialmenu__image}
								alt="behance"
								width={23}
								height={23}
							/>
						</a>
					</li>
				)}
			</ul>
		</div>
	);
};

export default SocialMenu;

//переробти цикл
