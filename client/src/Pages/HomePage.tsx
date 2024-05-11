import Hero from "../components/Hero"
import PricingTable from "../components/PricingTable"
import ContactUs from "../components/ContactUs"
import left from "../assets/img/LandingPage/left.avif"
import right from "../assets/img/LandingPage/right.avif"
import middle from "../assets/img/LandingPage/middle.avif"
import Features from "../components/Features"
import Footer from "../components/Footer"
import Testimonials from "../components/Testimonials"

const HomePage = () => {
  return (
    <div className="md:pt-6 w-screen overflow-hidden">
      <Hero />
      <div className="lg:relative lg:min-h-screen mb-7  flex justify-center">
        <img
          src={middle}
          alt="hero"
          className="hidden lg:block absolute w-1/2 m-auto inset-0 top-0 shadow-2xl rounded-xl z-10"
        />
        <img
          src={left}
          alt="hero"
          className="lg:absolute  w-11/12  lg:w-[37.5%] m-auto lg:-left-7 lg:top-[15%] shadow-2xl rounded-xl"
        />
        <img
          src={right}
          alt="hero"
          className="absolute hidden lg:block w-[37.5%] m-auto -right-5 top-[15%] shadow-2xl rounded-xl"
        />
      </div>
      <Testimonials />
      <Features />
      <PricingTable />
      <ContactUs />
      <Footer />
    </div>
  )
}

export default HomePage
