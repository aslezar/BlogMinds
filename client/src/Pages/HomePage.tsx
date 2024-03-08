import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import PricingTable from "../components/PricingTable"
import ContactUs from "../components/ContactUs"
import left from "../assets/img/LandingPage/left.avif"
import right from "../assets/img/LandingPage/right.avif"
import middle from "../assets/img/LandingPage/middle.avif"

const HomePage = () => {
    return (
        <div className="pt-12">
            <Navbar />
            <Hero />
            <div className="relative h-screen mb-7">
                <img
                    src={middle}
                    alt=""
                    className=" absolute w-1/2 m-auto inset-0 top-0"
                />
                <img
                    src={left}
                    alt=""
                    className="absolute  w-[37.5%] m-auto left-0 top-[15%]"
                />
                <img
                    src={right}
                    alt=""
                    className="absolute  w-[37.5%] m-auto right-0 top-[15%]"
                />
            </div>
            <PricingTable />
            <ContactUs />
        </div>
    )
}

export default HomePage
