import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import LandingPage from "./LandingPage";
import ForgotPassword from "./ForgotPassword";
import NotFound from "./NotFound";
import Marketplace from "./Marketplace";
import Dashboard from "./Dashboard";
import CreateListing from "./CreateListing";
import SuccessPage from "./SuccessPage";
import Conversations from "./Conversations";
import useStore from "./store";
import { ToastContainer } from "react-toastify";

function App() {
  const user = useStore((state) => state.name);
  

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Marketplace" element={<Marketplace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/conversations" element={<Conversations currentUserId={user} />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;