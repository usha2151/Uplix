import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Component/Pages/Dashboard/Dashboard";
import Navbar from "./Component/Common/Navbar";
import Sidebar from "./Component/Common/Sidebar";
import FestivalList from "./Component/Pages/Users/FestivalList";
import AddSignatureForm from "./Component/Pages/Users/AddSignatureForm";
import Addusers from "./Component/Pages/Users/Addusers";
import AddEmails from "./Component/Pages/Users/AddEmails";
import Settings from "./Component/Pages/Users/Settings";

const App = () => {

  const [showMenu, setShowMenu] = useState(false);


  return (
    <div className="min-h-[100vh] bg-[#F6F8FA] w-full nourd-text admin-dashboard">
      <div
        className={`w-full flex ${
          showMenu ? "overflow-hidden h-screen" : "sm:overflow-auto"
        }`}
      >
      <BrowserRouter>
       
         
            <Sidebar />
          
            <div className="w-full flex flex-col">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/fest-list" element={<FestivalList />} />
              <Route path="/view-signature" element={<AddSignatureForm />} />
              <Route path="/add-users" element={<Addusers />} />
              <Route path="/add-email" element={<AddEmails />} />
              <Route path="/setting" element={<Settings />} />
             

            </Routes>
           
          </div>
        
      </BrowserRouter>
    </div>
    </div>
    
  );
};

export default App;