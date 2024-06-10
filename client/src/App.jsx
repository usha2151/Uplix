import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Component/Common/Navbar";
import Sidebar from "./Component/Common/Sidebar";
import FestivalList from "./Component/Pages/Users/FestivalList";
import AddSignatureForm from "./Component/Pages/Users/AddSignatureForm";
import Addusers from "./Component/Pages/Users/Addusers";
import AddEmails from "./Component/Pages/Users/AddEmails";
import Settings from "./Component/Pages/Users/Settings";
import DashboardAdmin from "./Component/Pages/Admin/DashboardAdmin";
import DashboardUser from "./Component/Pages/Users/DashboardUser";
import SignUp from "./Component/Pages/Auth/SignUp";
import SignIn from "./Component/Pages/Auth/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
};

const MainApp = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const shouldHideNavAndSidebar = location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="min-h-[100vh] bg-[#F6F8FA] w-full nourd-text admin-dashboard">
      <div
        className={`w-full flex ${
          showMenu ? "overflow-hidden h-screen" : "sm:overflow-auto"
        }`}
      >
        {!shouldHideNavAndSidebar && <Sidebar />}
        <div className="w-full flex flex-col">
          {!shouldHideNavAndSidebar && <Navbar />}
          <Routes>
            <Route path="/user" element={<DashboardUser />} />
            <Route path="/fest-list" element={<FestivalList />} />
            <Route path="/view-signature" element={<AddSignatureForm />} />
            <Route path="/add-users" element={<Addusers />} />
            <Route path="/add-email" element={<AddEmails />} />
            <Route path="/setting" element={<Settings />} />
            <Route path="/admin" element={<DashboardAdmin />} />
            <Route path="/login" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
