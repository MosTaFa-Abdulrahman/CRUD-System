import "./register.css";
import { useState } from "react";
import { makeRequest } from "../../requestMethod";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !name) {
      return toast.warning("Fill All This Fields Please 😍");
    }
    if (password.length < 6) {
      return toast.warning("Password less than 6 digits 🙄");
    }

    if (loading) return;
    setLoading(true);

    try {
      const res = await makeRequest.post("auth/register", {
        username,
        email,
        password,
        name,
      });
      dispatch(setCredentials(res.data));
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      toast.success("Successful Registerd 😍");
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authBody">
      <div className="containerRegister">
        <div className="title"> Register</div>
        <div className="content">
          <form onSubmit={handleRegister}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Username </span>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username... "
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email... "
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password... "
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Full-Name </span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name... "
                  required
                />
              </div>
            </div>

            {error && (
              <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
            )}

            <NavLink to={"/login"}>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  padding: "10px",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
              >
                Go To Login
              </div>
            </NavLink>

            <div className="button">
              <input
                type="submit"
                value={loading ? "Loading..." : " Register"}
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
