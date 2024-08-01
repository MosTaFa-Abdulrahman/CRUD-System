import "./home.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

function Home() {
  const { userInfo: currentUser } = useSelector((state) => state.auth);
  const { handleLogout } = useLogout();

  return (
    <div className="home">
      {currentUser ? (
        <>
          <NavLink to={`/user/${currentUser._id}`}>
            <div>{currentUser.username}</div>
          </NavLink>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login">
            <div>Login</div>
          </NavLink>
          <NavLink to="/register">
            <div>Register</div>
          </NavLink>
        </>
      )}

      {currentUser?.role === "admin" && (
        <NavLink to="/users">
          <div>Users</div>
        </NavLink>
      )}
    </div>
  );
}

export default Home;
