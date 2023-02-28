import { GoogleMap, useGoogleMap} from '@react-google-maps/api'



const ReturnButton = ({coords}) => {

 

	 const map = useGoogleMap()

	 console.log("mao")
 	 console.log(map)

	 const handleClick = () => {
	// 	 map.panTo(coords)
	 }

	return (
					   <button onClick={handleClick}>111</button>
		)

}

export default ReturnButton