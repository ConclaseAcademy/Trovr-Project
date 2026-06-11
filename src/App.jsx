import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import LandingPage from "./LandingPage";
import ForgotPassword from "./ForgotPassword"
import NotFound from "./NotFound";
import Marketplace from "./Marketplace";
import Dashboard from "./Dashboard";
import CreateListing from "./CreateListing";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return(
    <Routes>
      <Route path="/" element={<LandingPage/> }/>
       <Route path="/login" element={<Login/> }/>
        <Route path="/signup" element={<Signup/> }/>
        <Route path="/ForgotPassword" element={<ForgotPassword/> }/>
         <Route path="/Marketplace" element={<Marketplace/> }/>
         <Route path="/dashboard" element={<Dashboard/> }/>
         <Route path="/create-listing" element={<CreateListing/> }/>
        <Route path="*" element={<NotFound/> }/>
        <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;  
