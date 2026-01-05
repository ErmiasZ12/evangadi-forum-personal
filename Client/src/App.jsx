// import { useState } from "react";
// import Header from "./components/header/Header";
// import { Route, Routes } from "react-router-dom";
// import SignInSignIn from "./components/SignUpSignIn/SignUpSignIn";
// import Login from "./pages/Login";
// import Home from "./pages/Home";

// import { createContext, useState } from "react";

// const AppState = createContext();

// function App() {
//   const [user, setUser] = useState(null);
//   const [questions, setQuestions] = useState([]);

//   return (
//     <AppState.Provider value={{ user, setUser, questions, setQuestions }}>
//       {/* routes */}
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<SignInSignIn />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </AppState.Provider>
//   );
// }

// export default App;



import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/header/Header";
import SignInSignIn from "./components/SignUpSignIn/SignUpSignIn";
import Login from "./pages/Login";
import Home from "./pages/Home";

/* ✅ EXPORT THE CONTEXT */
export const AppState = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);

  return (
    <AppState.Provider value={{ user, setUser, questions, setQuestions }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignInSignIn />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
