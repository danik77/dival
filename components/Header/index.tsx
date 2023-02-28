import Image from "next/image";
import LangSwitcher from "../LangSwitcher";
import Logo from "../Logo";
import Nav from "../Nav";
import SocialMenu from "../SocialMenu";

import { useEffect, useState } from "react";

import style from "./style.module.scss";

const MobileMenuButton = (props) => {
	const handleClick = () => {
		props.toggleMobMenu();
	};
	return (
		<div onClick={handleClick} className={style.mobilemenuButton}>
			<span></span>
		</div>
	);
};

const MobileMenu = (props) => {
	const handleClick = () => {
		props.closeMobMenu();
	};

	return (
		<>
			<div className={`${style.mobile} mobilemenu`}>
				<div className={style.mobile__cancelIcon}>
					<Image
						src="/images/cancel.svg"
						alt="cancel"
						width={24}
						height={24}
						onClick={handleClick}
						priority={true}
					/>
				</div>
				<div onClick={handleClick}>
					<Nav type="mobilemenu" />
				</div>

				<SocialMenu contacts={props.contacts} />
				<LangSwitcher />
			</div>
			<div className={style.overlay}></div>
		</>
	);
};

const HeaderMobile = ({ contacts }) => {
	const [showMenu, setShowMenu] = useState(false);

	const toggleMobMenu = () => {
		setShowMenu(!showMenu);
	};

	const closeMobMenu = () => {
		setShowMenu(false);
	};

	return (
		<>
			<div className={style.header}>
				<Logo />
				<MobileMenuButton toggleMobMenu={toggleMobMenu} />
			</div>

			{showMenu && (
				<MobileMenu
					showMenu={showMenu}
					closeMobMenu={closeMobMenu}
					contacts={contacts}
				/>
			)}
		</>
	);
};

const HeaderDesktop = ({ contacts }) => {
	const [scrollHeader, setScrollHeader] = useState(false);
	const [headerHeight, setHeaderHeight] = useState(0);

	const handle = () => {
		window.pageYOffset > 0 &&
			window.pageYOffset < 30 &&
			setHeaderHeight(window.pageYOffset);

		window.pageYOffset > 30 ? setScrollHeader(true) : setScrollHeader(false);

		window.pageYOffset === 0 && setHeaderHeight(0);
	};

	useEffect(() => {
		window.addEventListener("scroll", handle);

		return () => {
			window.removeEventListener("scroll", handle);
		};
	}, []);

	return (
		<div
			className={`${style.header} ${scrollHeader && style.scrollHeader}`}
			style={{ height: 96 - headerHeight }}
		>
			<Logo />
			<Nav />
			<div className={style.header__right}>
				<LangSwitcher />
				<SocialMenu contacts={contacts} />
			</div>
		</div>
	);
};

const Header = ({ contacts }) => {
	const [screenWidth, setScreenWidth] = useState(0);

	useEffect(() => {
		if (typeof window !== undefined) {
			setScreenWidth(window.innerWidth);
		}
	}, []);
	return (
		<>
			{screenWidth > 768 && <HeaderDesktop contacts={contacts} />}

			{screenWidth <= 768 && <HeaderMobile contacts={contacts} />}
		</>
	);
};

export default Header;
