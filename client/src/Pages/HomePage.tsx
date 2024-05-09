import Hero from "../components/Hero"
import PricingTable from "../components/PricingTable"
import ContactUs from "../components/ContactUs"
import left from "../assets/img/LandingPage/left.avif"
import right from "../assets/img/LandingPage/right.avif"
import middle from "../assets/img/LandingPage/middle.avif"
import Features from "../components/Features"
import Footer from "../components/Footer"

const HomePage = () => {
  return (
    <div className="pt-12">
      <Hero />
      <div className="relative h-screen mb-7 overflow-hidden">
        <img
          src={middle}
          alt=""
          className=" absolute w-1/2 m-auto inset-0 top-0 shadow-2xl rounded-xl z-10"
        />
        <img
          src={left}
          alt=""
          className="absolute w-[37.5%] m-auto -left-7 top-[15%] shadow-2xl rounded-xl"
        />
        <img
          src={right}
          alt=""
          className="absolute w-[37.5%] m-auto -right-5 top-[15%] shadow-2xl rounded-xl"
        />
      </div>
      <Features />
      <PricingTable />
      <ContactUs />
      <Footer />
    </div>
  )
}

export default HomePage
