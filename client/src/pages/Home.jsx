import BgSlider from "../components/BgSlider";
import Header from "../components/Header";
import Steps from "../components/Steps";
import Testinomials from "../components/Testinomials";
import Upload from "../components/Upload";

const Home = () => {
  return (
    <>
      <div>
         <Header />
         <Steps />
         <BgSlider />
         <Testinomials />
         <Upload />
    </div> 
    </>
  )
}

export default Home;