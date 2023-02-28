import Image from 'next/image'
import Link from "next/link";

import style from "./style.module.scss";

const Logo = () => {
	return (
		<div className={style.logo}>
		<Link href="/">
            <a><Image src="/images/logo.svg" alt="Dival Logo" width={128} height={28}  /></a>
          </Link>
          </div>
	);
}

export default Logo;

// sizes="(max-width: 768px) 102px, (min-width: 769px) 128px, 128px"