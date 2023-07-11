import { useState, useEffect, useContext } from "react";
import style from "./style.module.scss";
import { useTranslation } from "next-i18next";
//import { sendMail } from "../../functions.js";
import ContactSent from "./ContactSent";

import Image from "next/image";

import Select from "react-select";
import { useRouter } from "next/router";

import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

import DivalContext from "../../context";

import axios from "axios";

import { styleSelect } from "./styleSelect.js";

const INITIAL_STATE = {
	name: "",
	email: "",
	phone: "",
	country: "",
	city: "",
	category: "",
};

const INITIAL_ERRORS = [
	"name",
	"email",
	"phone",
	"country"
];

const ContactForm = (props: any) => {
	const { t } = useTranslation("common");

	const router = useRouter();

	const context = useContext(DivalContext);

	const [formData, setFormData] = useState(INITIAL_STATE);

	const [sending, setSending] = useState(false);
	const [sent, setSent] = useState(false);

	const [validationError, setValidationError] = useState([]);

	const [validEmail, setValidEmail] = useState(true);

	const [apiData, setApiData] = useState([]);
	const [countries, setCountries] = useState([]);
	const [cities, setCities] = useState([]);

	const categories = context.categories.data;

	useEffect(() => {
		fetch("https://countriesnow.space/api/v0.1/countries")
			.then((response) => response.text())
			.then((result) => {
				const countriesData = JSON.parse(result).data;
				setApiData(countriesData);
				const countriesOptions = [];
				countriesData.map((item) => {
					countriesOptions.push({
						label: item.country,
						value: item.country,
					});
				});
				setCountries(countriesOptions);
			});

	}, []);

	useEffect(() => {
		//detect country

		apiData.length &&
			axios.get("https://get.geojs.io/v1/ip/geo.js").then((res) => {
				const detectCountry = JSON.parse(res.data.slice(6, -2)).country;
				setFormData({
					...formData,
					country: { label: detectCountry, value: detectCountry },
				});
				fillCities(detectCountry);
			});
	}, [apiData]);

	const handleChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });

		if (e.target.value !== "" && e.target.name !== "email") {
			//	arr = arr.filter(item => item !== value)
			const arr = validationError.filter(
				(item) => item !== e.target.name
			);
			console.log(arr);
			setValidationError(arr);
		}

		if (
			e.target.value === "" &&
			!validationError.includes(e.target.name) &&
			e.target.name !== "email"
		) {
			const newValidationError = validationError;
			newValidationError.push(e.target.name);
			setValidationError(newValidationError);
		}

		if (e.target.name === "email") {
			const re =
				/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

			if (
				e.target.value.toLowerCase().match(re) ||
				e.target.value === ""
			) {
				setValidEmail(true);
			} else {
				setValidEmail(false);
			}
		}
	};

	const fillCities = (countryName) => {
		const country = apiData.find((item) => item.country === countryName);
		const citiesOptions = [];
		country.cities.map((city) => {
			citiesOptions.push({ label: city, value: city });
		});
		setCities(citiesOptions);
	};

	const changeSelectCountries = (e: any) => {
		//Validation
		const arr = validationError.filter((item) => item !== "country");
		setValidationError(arr);

		const selectedCountry = e.value;

		setFormData({ ...formData, country: e, city: "" });

		// 	fillCities(selectedCountry)

		const country = apiData.find(
			(item) => item.country === selectedCountry
		);

		const citiesOptions = [];

		country.cities.map((city) => {
			citiesOptions.push({ label: city, value: city });
		});

		setCities(citiesOptions);
	};

	const changeSelectCities = (e: any) => {
		//Validation
		const arr = validationError.filter((item) => item !== "city");
		setValidationError(arr);
		const selectedCity = e.value;
		setFormData({ ...formData, city: e });
	};

	// SUBMIT FORM
	const submitForm = async (e: any) => {
		e.preventDefault();

		console.log(formData);

		if (formData.email === "") {
			//	setValidEmail(false)
		}

		const newValidationError = [];

		Object.entries(formData).map((item) => {
			const key = item[0];
			const val = item[1];

			if (val === "" && key !== "email" && key !== "city" && key !=="category") {
				newValidationError.push(key);
			}
		});

		setValidationError(newValidationError); /// ASYNC ~!!!!!

		//переробити на ретурн
		if (!newValidationError.length && validEmail) {
			//alert("send")
			//change sending
			setSending(true);

			//send mail

			const sendMail = await axios.post("/api/contact", {
				data: formData,
				email: context.contacts.data.attributes.Email,
			});

			if (sendMail.status === 200) {
				console.log(sendMail);
				console.log("mail sent");
				setSending(false);
				setSent(true);

				if (window !== undefined) {
					window.scrollTo({
						top: 0,
						behavior: "smooth",
					});
				}
			} else {
				console.log(sendMail);
			}

			//send db

			fetch(process.env.NEXT_PUBLIC_DIVAL_BACKEND + "/orders", {
				method: "POST",
				headers: {
					Accept: "application/json, text/plain",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					data: {
						Name: formData.name,
						Phone: formData.phone,
						Email: formData.email !== "" ? formData.email : null,
						Category: formData.category,
						Country: formData.country?.label,
						City: formData.city?.label,
					},
				}),
			})
				.then((res) => {})
				.catch((err) => console.log(err));

			//clear form

			//show message
		} else {
			//alert("no valid")
		}
	};

	const closePopup = () => {
		props.closeForm && props.closeForm();
	};

	return (
		<>
			{!sent && (
				<div className={props.className}>
					<form className={style.contact__form}>
						<div className={style.contact__header}>
							<h3>{t("consultation-form")}</h3>
							<div className={style.contact__cancelIcon}>
								<Image
									src="/images/cancel.svg"
									alt="cancel"
									width={14}
									height={14}
									onClick={closePopup}
									priority={true}
								/>
							</div>
						</div>

						<>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder={t("name") + "*"}
								required={true}
								className={
									validationError.includes("name")
										? style.contact__errorInput
										: style.contact__input
								}
							/>
							<div
								className={style.contact__helperText}
								style={{
									display: validationError.includes("name")
										? "block"
										: "none",
								}}
							>
								<span>{t("type-name")}</span>
							</div>

							<input
								id="phone"
								type="text"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								placeholder={t("phone") + "*"}
								required={true}
								className={
									validationError.includes("name")
										? style.contact__errorInput
										: style.contact__input
								}
							/>
							<div
								className={style.contact__helperText}
								style={{
									display: validationError.includes("phone")
										? "block"
										: "none",
								}}
							>
								<span>{t("type-phone")}</span>
							</div>

							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder={t("email")}
								required={true}
							/>

							{!validEmail && (
								<div className={style.contact__helperText}>
									<span>{t("type-valid-email")}</span>
								</div>
							)}

							<Select
								styles={styleSelect}
								id="country"
								name="country"
								label="country"
								options={countries}
								value={formData.country}
								placeholder={t("country") + "*"}
								onChange={changeSelectCountries}
							/>
							<div
								className={style.contact__helperText}
								style={{
									display: validationError.includes("country")
										? "block"
										: "none",
									marginTop: "2px",
									marginBottom: "0px",
								}}
							>
								<span>{t("select-country")}</span>
							</div>

							<br />

							<Select
								styles={styleSelect}
								id="city"
								name="city"
								label="city"
								options={cities}
								value={formData.city}
								placeholder={t("city")}
								onChange={changeSelectCities}
							/>
							<div
								className={style.contact__helperText}
								style={{
									display: validationError.includes("city")
										? "block"
										: "none",
									marginTop: "2px",
									marginBottom: "0px",
								}}
							>
								<span>{t("select-city")}</span>
							</div>

							{categories?.length && (
								<>
									<h4
										className={
											style.contact__categoriesTitle
										}
									>
										{t("what-is-your-project")}
									</h4>
									<div
										className={style.contact__helperText}
										style={{
											display: validationError.includes(
												"category"
											)
												? "block"
												: "none",
											marginTop: "2px",
											marginBottom: "0px",
										}}
									>
										<span>{t("select-project-type")}</span>
									</div>
									<div className={style.contact__categories}>
										{categories.map((category) => (
											<div
												className={
													style.contact__category
												}
											>
												<input
													type="radio"
													id={category.id}
													name="category"
													value={
														category.attributes.Name
													}
													onChange={handleChange}
												/>
												<label htmlFor={category.id}>
													{router.locale === "uk"
														? category.attributes
																.Name
														: category.attributes.localizations.data.find(
																(item: any) =>
																	item
																		.attributes
																		.locale ===
																	router.locale
														  ).attributes.Name}
												</label>
											</div>
										))}

										<div
											className={style.contact__category}
										>
											<input
												type="radio"
												id="categoryOther"
												name="category"
												value="Other"
												onChange={handleChange}
											/>
											<label htmlFor="categoryOther">
												{t("other")}
											</label>
										</div>
									</div>
								</>
							)}

							<div className={style.contact__footer}>
								<span
									className={` ${style.contact__cancelButton} btn btn-transparent`}
									onClick={closePopup}
								>
									{t("cancel")}
								</span>
								<button
									onClick={submitForm}
									className="btn btn-red"
									disabled={
										!!validationError.length || !validEmail
									}
								>
									{sending
										? t("sending")
										: t("get-consultation")}
								</button>
							</div>
						</>
					</form>
				</div>
			)}

			{sent && <ContactSent closePopup={closePopup} type={props.type} />}
		</>
	);
};

export default ContactForm;
