import Head from 'next/head'


const Seo = ({metaTitle, metaDesc, keywords}) => {



	return(
<Head>
	 <meta name="description" content={metaDesc} key="description" />
      <meta name="keywords" content={keywords} />
	</Head>

)
}

export default Seo