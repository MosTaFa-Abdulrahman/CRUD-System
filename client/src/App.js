import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Profile from "./pages/profile/Profile";

function App() {
  const { userInfo: currentUser } = useSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={currentUser ? <Home /> : <Navigate to="register" />}
          />

          {/* Users Admin Controller */}
          <Route
            path="/users"
            element={
              currentUser?.role === "admin" ? <Users /> : <Navigate to="/" />
            }
          />

          {/* Single User Profile */}
          <Route
            path="/user/:id"
            element={currentUser ? <Profile /> : <Navigate to="/" />}
          />

          {/* Auth */}
          <Route
            path="/register"
            element={!currentUser ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!currentUser ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
