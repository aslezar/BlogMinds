import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//genrate some categories for blog writing
const categories = [
	"For You",
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
		<Tabs TabIndicatorProps={{
			style: {display: 'none'}
		}} value={categories.indexOf(category)} onChange={handleChange} indicatorColor="secondary" textColor="secondary" variant="scrollable" scrollButtons="auto" className="w-[90%]">
			{categories.map((category, index) => (
				<Tab label={category} key={index} disableRipple className="!text-[0.9rem] !capitalize"/>
			))}
		</Tabs>
	);
};

export default Categories;
