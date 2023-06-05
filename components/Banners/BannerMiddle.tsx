import React from 'react'
import Image from "next/image";
  import { useRouter } from "next/router";
  import style from "./style.module.scss";

import {useState, useEffect} from 'react';


const Counter = ({number, speed} : any ) => {
  
  const [counter, setCounter] = useState(1);

   

  	const myRef = React.createRef()


  	console.log(myRef.current)

useEffect(() => {

	setTimeout(() => {
		if(counter === number) return;
		setCounter(counter + 1 )
	}, 1000 / number )

	console.log(myRef)

}, [counter])

return (
	<span ref={myRef}>{counter}</span>
);


}

//<Counter number={150} speed={100} />
 
const BannerMiddle = ({homepage}) => {

	const myRef = React.createRef()
const router = useRouter();

	const base = homepage[router.locale]?.data?.attributes?.BannerMiddle;


	return (

		<>
				{base && 
		<div
		ref={myRef}

		className={style.bannerMiddle}
		>

			<div className={style.bannerMiddle__imageWrapper}>
				<div className={style.bannerMiddle__text}>
					<h5 className={style.bannerMiddle__title}>{base.bannerMiddleNumber1}{base.bannerMiddlePlus1 && "+"}</h5>
					<p>{base.bannerMiddleText1}</p>
				</div>
				<div className={style.bannerMiddle__image}>
					<Image
						src={base.bannerMiddleImage1.data.attributes.url}
						alt="Image"
						layout="fill"
						objectFit="cover"
					/>
				</div>
			</div>
			<div className={style.bannerMiddle__imageWrapper}>
			
				<div  className={style.bannerMiddle__image}>
					<Image
						src={base.bannerMiddleImage2.data.attributes.url}
						alt="Image"
						layout="fill"
						objectFit="cover"
					/>
				</div>
					<div className={style.bannerMiddle__text}>
					<h5 className={style.bannerMiddle__title}>{base.bannerMiddleNumber2}{base.bannerMiddlePlus2 && "+"}</h5>
					<p>{base.bannerMiddleText2}</p>
				</div>
			</div>

			<div className={style.bannerMiddle__imageWrapper} >
			 
				<div className={style.bannerMiddle__text}>
					<h5 className={style.bannerMiddle__title}>{base.bannerMiddleNumber3}{base.bannerMiddlePlus3 && "+"}</h5>
					<p>{base.bannerMiddleText3}</p>
				</div>

					<div  className={style.bannerMiddle__image}>
					<Image
						src={base.bannerMiddleImage3.data.attributes.url}
						alt="Image"
						layout="fill"
						objectFit="cover"
					/>
				</div>
			</div>
		</div>
	}</>
	);
};

export default BannerMiddle;
