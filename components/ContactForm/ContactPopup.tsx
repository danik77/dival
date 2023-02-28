import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import style from './style.module.scss'

const ContactPopup = (props: any) => {

	const [enabled, setEnabled] = useState(true);

	const onSubmitHandler = () => {
		closeForm();
	}

	const closeForm = () => {
		props.closeForm();
	}

	return(
		<div>
			<ContactForm className={style.contact__popup} closeForm={closeForm} type="popup" /> 
			<div className={style.overlay} onClick={closeForm}></div>
		</div>
	);
}

export default ContactPopup;
