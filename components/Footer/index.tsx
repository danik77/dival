import ContactBox from "../ContactBox";
import Map from "../Map";
import BannerBottom from "../Banners/BannerBottom";
import ReturnButton from "../Map/ReturnButton";
import style from "./style.module.scss";

const Footer = ({ contacts }: any) => {
	const coords = {
		lat: contacts.data.attributes.GoogleMapsLatitude,
		lng: contacts.data.attributes.GoogleMapsLongitude,
	};

	return (
		<>
			{/*<div className="container"><BannerBottom homepage={homepage}/></div>*/}
			<div className={style.footer}>
				<div className={style.footer__box}>
					<div className={style.footer__left}>
						<ContactBox contacts={contacts} />
					</div>
					<div className={style.footer__right}>
						<Map coords={coords} />
					</div>
				</div>
				<div className={style.footer__copyright}><p>{contacts.data.attributes.Copyright}</p></div>
			</div>
		</>
	);
};

export default Footer;
