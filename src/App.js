import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
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
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";
import PolicySearch from "./PolicySearch";
import ProfilePage from "./ProfilePage";
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Home layout route with nested pages for Admin Pages */}
        <Route path="/adminhome" element={<AdminHome />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="profile" element={<ProfilePage />}/>
          <Route path="create" element={<CreatePolicyHolder />}/>
          <Route path="update" element={<UpdateInsuredPerson/>}/>
          <Route path="firstName" element={<FindByFirstName />} />
          <Route path="policySearch" element={<PolicySearch />} />
          <Route path="lastName" element={<FindByLastName />} />
          <Route path="firstChar" element={<FindByFirstChar />} />
          <Route path="delete" element={<DeleteInsuredPerson/>} />
          <Route path="changePassword" element={<ChangePassword/>} />
        </Route>

        {/* Home layout route with nested pages for User Pages */}
        <Route path="/userhome" element={<UserHome />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="profile" element={<ProfilePage/>}/>
          <Route path="policyNumber" element={<FindByPolicyNumber />} />
          <Route path="updatePolicy" element={<UpdateInsuredPerson />}/>
          <Route path="changePassword" element={<ChangePassword/>} />
        </Route>

      </Routes>
    </Router>
  );
}
