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
interface TabPanelProps {
	children?: React.ReactNode;
	category: string;
	setCategory: React.Dispatch<React.SetStateAction<string>>;
}
const Categories = ({ category, setCategory }: TabPanelProps) => {
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setCategory(categories[newValue]);
	};
	return (
		<Tabs value={categories.indexOf(category)} onChange={handleChange} centered>
			{categories.map((category, index) => (
				<Tab label={category} key={index} />
			))}
		</Tabs>
	);
};

export default Categories;
