import { useState, useEffect } from "react";
import React from "react";
import ImageGallery from "react-image-gallery";
import Image from "next/image";

import style from "./style.module.scss";

 

//gakllery any
//next image
const Gallery = ({ gallery }: any) => {
	const [showCarousel, setShowCarousel] = useState(false);
	const [carouselImages, setCarouselImages] = useState(false);
	const [carouselIndex, setCarouselIndex] = useState(0);

	useEffect(() => {
		//if no gallery&&??

		//переробити

		const carouselImagesArr = [];

		gallery.map((image) => {
			carouselImagesArr.push({
				original: image.attributes.url,
				thumbnail: image.attributes.formats.thumbnail.url,
			});
		});

		setCarouselImages(carouselImagesArr);
	}, []);

	const handleClick = (index) => {
		setCarouselIndex(index);
		setShowCarousel(true);
	};

	const closeCarousel = () => {
		setShowCarousel(false);
	};
	return (
		<>
			<div className={style.galleryList}>
				{gallery &&
					gallery.map((image, index) => (
						<div
							className={`${style.projectListItem} ${!(index % 2) && style.projectListItem__marginTop}`}
						>
							<div
								className={style.projectListItem__imageBlock}
								onClick={() => handleClick(index)}
							>
								<div className={style.projectListItem__discover}>
									<span className={style.projectListItem__discoverCaption}>
										{" "}
									</span>
								</div>

								<Image
									className={style.projectListItem__image}
									src={image.attributes.url}
									alt=""
									width={468}
									height={354}
									objectFit="cover"
								/>
							</div>
						</div>
					))}
			</div>

			{showCarousel && (
				<>
					<div className={style.carousel}>
						<div
							className={style.carousel__topPanel}
							onClick={closeCarousel}
						>
							<Image
								className={style.contact__cancelIcon}
								src="/images/cancel.svg"
								alt="cancel"
								width={13}
								height={13}
								onClick={closeCarousel}
							/>
						</div>
						<ImageGallery
							items={carouselImages}
							showPlayButton={false}
							showFullscreenButton={false}
							startIndex={carouselIndex}
							renderLeftNav={(onClick, disabled) => (
								<LeftNav onClick={onClick} disabled={disabled} />
							)}
							renderRightNav={(onClick, disabled) => (
								<RightNav onClick={onClick} disabled={disabled} />
							)}
						/>
					</div>
					<div className={style.overlay} onClick={closeCarousel}></div>
				</>
			)}
		</>
	);
};

const LeftNav = React.memo(({ disabled, onClick }) => {
	return (
		<button
			type="button"
			className={`${style.gallery__arrow} image-gallery-icon image-gallery-left-nav arrow-left-white`}
			disabled={disabled}
			onClick={onClick}
			aria-label="Previous Slide"
		></button>
	);
});

const RightNav = React.memo(({ disabled, onClick }) => {
	return (
		<button
			type="button"
			className={`${style.gallery__arrow} image-gallery-icon image-gallery-right-nav arrow-right-white`}
			disabled={disabled}
			onClick={onClick}
			aria-label="Next Slide"
		></button>
	);
});

export default Gallery;

 