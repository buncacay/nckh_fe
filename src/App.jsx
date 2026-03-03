import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserManager from '../page/Settings/UserManager';
import Layout from '../components/layout/layout';
import Approval from '../page/Dashboard/Approval';
import IssueDiploma from '../page/Diploma/IssueDiploma';
import IssueCopy from '../page/Copy/Copy';
import Dashboard from '../page/Dashboard/dashboard'
import IssueAmend from '../page/Revoke/Revoke'; 
import Guest from '../page/Guest/guest';
import HandleExcel from '../page/Diploma/HandleExcel';
import Majors from '../page/Majors/Majors';
import Faculty from '../page/Majors/Faculty';
import Student from '../page/Majors/Student';
import SendNoti from '../page/Settings/SendNotification';
import AddNoti from '../page/Settings/AddNoti';
import DiplomaSafeFinal from '../page/Diploma/demo';


import Login from '../page/Login/login';

const NotFound = () => (
  <div className="p-10 text-center min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
    <p className="text-2xl text-gray-700 mb-8">Trang không tồn tại</p>
    <a href="/" className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-teal-700 transition">
      Quay về Trang chủ
    </a>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Các route cụ thể đặt TRƯỚC */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/issue" element={<Layout><IssueDiploma /></Layout>} />
        <Route path="/copy" element={<Layout><IssueCopy/></Layout>} />
        <Route path="/approval" element={<Layout><Approval/></Layout>} />
        <Route path="/revoke" element={<Layout><IssueAmend/></Layout>} />
        <Route path="/process" element={<Layout><HandleExcel /></Layout>} />
        <Route path="/guest" element = {<Guest></Guest>} />
        <Route path="/majors" element = {<Layout><Majors/></Layout>} />
        <Route path="/faculty" element = {<Layout><Faculty/></Layout>} />
        <Route path="/sendnoti" element = {<Layout><SendNoti/></Layout>} />
        <Route path="/student" element = {<Layout><Student/></Layout>} />
        <Route path="/addnoti" element = {<Layout><AddNoti/></Layout>} />
        <Route path="/manager" element = {<Layout><UserManager/></Layout>} />
        <Route path="/demo" element = {<DiplomaSafeFinal/>} />
        
        <Route path="/login" element={<Login />} />
        {/* Trang chủ và route mặc định - đặt SAU các route cụ thể */}
         <Route path="/" element = {<Guest></Guest>} />

        {/* 404 catch-all - đặt CUỐI CÙNG */}
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </Router>
  );
}

export default App;