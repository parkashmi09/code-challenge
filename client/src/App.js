import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { FormComponent } from "./components/FormComponent";
import ProtectedRoute from "./components/hoc/protected";
import EditForm from "./components/EditForm";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
    <Router>
      <Routes>
      <Route
          path="/"
          element={<ProtectedRoute element={<><Header/><HomePage/></>} />}
        />
         <Route
          path="/user-profile"
          element={<ProtectedRoute element={<><Header/><EditForm/></>} />}
        />
        <Route path="/sign-up" element={<FormComponent />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    <Toaster/>
    </>
  );
};

export default App;
