import Navbar from "./Navbar"
import Imagee from "./Imagee"
import Hero from "./Hero"
import WhyChoose from "./WhyChoose"
import CTABanner from "./CTABanner"
import Footer from "./Footer"

function LandingPage({ setPage }) {
  return(
    <div>
      <Navbar setPage={setPage} />
      <Imagee/>
      <Hero/>
      <WhyChoose/>
      <CTABanner/>
      <Footer/>

    </div>
  );
} 

export default LandingPage;