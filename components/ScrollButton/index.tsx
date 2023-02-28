import { useState, useEffect } from "react";
import Image from "next/image";
import style from "./style.module.scss";

const ScrollButton = () => {
	const [visible, setVisible] = useState(false);
 
	useEffect(() => {
		window.addEventListener("scroll", handle);

		return () => {
			window.removeEventListener("scroll", handle);
		};
	});

	const handle = () => {
		window.pageYOffset > 200 ? setVisible(true) : setVisible(false);
	};

	const scrollToTop = () => {
		if (window !== undefined) {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	};

	return (
		<div className={style.scrollButton__wrapper}>
			{visible && (
				<div className={style.scrollButton} onClick={scrollToTop}>
					<Image
						src="/images/arrow_up.svg"
						alt="scroll up"
						width={10}
						height={12}
					/>
				</div>
			)}
		</div>
	);
};

export default ScrollButton;
