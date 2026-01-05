import { createContext,useState,useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import axiosBase from "./axiosConfig";
import Header from "./components/header/Header";
import SignInSignIn from "./components/SignUpSignIn/SignUpSignIn";
import Login from "./pages/Login";
import Home from "./pages/Home";

/* EXPORT THE CONTEXT */
export const AppState = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // Check logged-in user using token
  const checkUser = async () => {
    const token = localStorage.getItem("token");

    // STOP if no token
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const { data } = await axiosBase.get("/users/check");
      setUser(data);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

    useEffect(() => {
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        checkUser();
      }
    }, [location.pathname]);

  return (
    <AppState.Provider value={{ user, setUser, questions, setQuestions }}>
      <Header />

      <Routes>

        <Route path="/register" element={<SignInSignIn />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
