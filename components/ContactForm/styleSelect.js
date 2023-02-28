export const styleSelect = {
	container: (base) => ({
		...base,
		marginTop: "7px",
		    marginBottom: "-2px"
	}),
	control: (base) => ({
		...base,
		height: 56,
		minHeight: 56,
		paddingLeft: "10px",
		"&:hover": {
			border: "1px solid #9D9C9C",
			boxShadow: "none",
		},
		"&:focus": {
			outline: "none",
			border: "1px solid #2C2926",
		},
		"&:focus:hover": {
			outline: "none",
			border: "1px solid #2C2926",
		},
	}),

	input: (base) => ({
		...base,
		height: 56,
		margin: 0,
	}),
	valueContainer: (base) => ({
		...base,
		paddingTop: "0px",
		padding: "0px 8px"
	}),
	placeholder: (base) => ({
		...base,
		textTransform: "none",
		color: "#B1B0B0",
	}),

	singleValue: (base) => ({
		...base,
		textTransform: "none",
	}),
	option: (base) => ({
		...base,
		textTransform: "none",
	}),
	indicatorSeparator: (base) => ({
		...base,
		display: "none",
	}),
indicatorContainer: (base) => ({
		...base,
		 	paddingRight: "17px",
    paddingTop: "4px"
	}),

 
};
