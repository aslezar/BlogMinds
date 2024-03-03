import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PricingTable from "../components/PricingTable";
import ContactUs from "../components/ContactUs";



const HomePage = () => {
	return (
		<div className="pt-12">
			<Navbar/>
			<Hero/>
			<PricingTable/>
			<ContactUs/>
		</div>
	);
};

export default HomePage;
