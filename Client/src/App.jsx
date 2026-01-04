import { useState } from 'react'
import Header from "./components/header/Header"
import { Route,Routes } from "react-router-dom";
import SignInSignIn from "./components/SignUpSignIn/SignUpSignIn"
function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/register" element={<SignInSignIn />} />
      </Routes>
    </>
  );
}

export default App
