import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import Layout from "../components/layout/layout";
import Dashboard from "../page/Dashboard/dashboard";
import Approval from "../page/Dashboard/Approval";
import IssueDiploma from "../page/Diploma/IssueDiploma";
import IssueCopy from "../page/Copy/Copy";
import IssueAmend from "../page/Revoke/Revoke";
import HandleExcel from "../page/Diploma/HandleExcel";
import Majors from "../page/Majors/Majors";
import Faculty from "../page/Majors/Faculty";
import Infor from "../page/Majors/Infor";
import SendNoti from "../page/Settings/SendNotification";
import AddNoti from "../page/Settings/AddNoti";
import UserManager from "../page/Settings/UserManager";
import Guest from "../page/Guest/guest";
import Login from "../page/Login/login";
import DiplomaSafeFinal from "../page/Diploma/demo";


const ROLES = {
  ADMIN: "Admin",
  STUDENT: "Student"
};



const ProtectedRoute = ({ children, roles }) => {
  const role = localStorage.getItem("role");

  if (!role || (role !== ROLES.ADMIN && role !== ROLES.STUDENT)) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/issue"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <Layout><IssueDiploma /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/copy"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <Layout><IssueCopy /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/revoke"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <Layout><IssueAmend /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/process"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <Layout><HandleExcel /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/majors"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <Layout><Majors /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <Layout><Faculty /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <Layout><UserManager /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sendnoti"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <Layout><SendNoti /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/addnoti"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <Layout><AddNoti /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/infor"
          element={
            <ProtectedRoute roles={[ROLES.STUDENT, ROLES.ADMIN]}>
              <Layout><Infor /></Layout>
            </ProtectedRoute>
          }
        />

        <Route path="/guest" element={<Guest />} />
        <Route path="/demo" element={<DiplomaSafeFinal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Guest />} />

        {/* 404 */}
        <Route path="*" element={<div className="p-10 text-center">404 Not Found</div>} />

      </Routes>
    </Router>
  );
}

export default App;