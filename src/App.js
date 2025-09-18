import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Welcome from "./Welcome";
import FindByPolicyNumber from "./FindByPolicyNumber";
import GetAllInsuredPersons from "./GetAllInsuredPersons";
import FindByFirstName from "./FindByFirstName";
import FindByFirstChar from "./FindByFirstChar";
import FindByLastName from "./FindByLastName";
import CreatePolicyHolder from "./CreatePolicyHolder";
import UpdateInsuredPerson from "./UpdateInsuredPerson";
import ChangePassword from "./ChangePassword";
import DeleteInsuredPerson from "./DeleteInsuredPerson";
import ForgotPassword from "./ForgotPassword";
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Home layout route with nested pages */}
        <Route path="/home" element={<Home />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="create" element={<CreatePolicyHolder />}/>
          <Route path="update" element={<UpdateInsuredPerson/>}/>
          <Route path="policyNumber" element={<FindByPolicyNumber />} />
          <Route path="all" element={<GetAllInsuredPersons />} />
          <Route path="firstName" element={<FindByFirstName />} />
          <Route path="lastName" element={<FindByLastName />} />
          <Route path="firstChar" element={<FindByFirstChar />} />
          <Route path="delete" element={<DeleteInsuredPerson/>} />
          <Route path="changePassword" element={<ChangePassword/>} />
        </Route>
      </Routes>
    </Router>
  );
}
