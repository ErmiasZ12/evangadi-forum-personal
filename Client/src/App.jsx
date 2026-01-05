import { useState } from "react";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import SignInSignIn from "./components/SignUpSignIn/SignUpSignIn";
import Login from "./pages/Login";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/register" element={<SignInSignIn />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
