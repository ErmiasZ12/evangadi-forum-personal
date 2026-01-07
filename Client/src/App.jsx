import { createContext, useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import instance from "./axiosConfig";
import Header from "./components/Header/Header";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Footer from "./components/Footer/Footer";
import QuestionDetailPage from './pages/QueDetailPostAns/QuestionDetailPage'
import ForgotPassword from './pages/Forgot password/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';

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
      const { data } = await instance.get("/users/check");
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

  // Fetch all questions
  const fetchQuestions = async () => {
    try {
      const { data } = await instance.get("/questions");
      setQuestions(data.questions); // latest first
    } catch (err) {
      console.log(err);
    }
  };
    useEffect(() => {
      if (user) fetchQuestions(); // only fetch if logged in user
    }, [user]);

  return (
    <AppState.Provider value={{ user, setUser, questions, setQuestions }}>
      <Header />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/questions/:question_id"
          element={<QuestionDetailPage />}
        />

        {/* prtected routes */}
        <Route
          path="/ask"
          element={
            <ProtectedRoute>
              <AskQuestion />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/question/:question_id"
          element={
            <ProtectedRoute>
              <QuestionDetailPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;
