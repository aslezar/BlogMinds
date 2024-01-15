import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//genrate some categories for blog writing
const categories = [
	"General",
	"Technology",
	"Food",
	"Politics",
	"Travel",
	"Sports",
	"Health",
	"Finance",
];

const Categories = () => {
	const [value, setValue] = React.useState(0);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Tabs value={value} onChange={handleChange} centered>
			{categories.map((category, index) => (
				<Tab label={category} key={index} />
			))}
		</Tabs>
	);
};

export default Categories;
