import { useState } from "react";
import { makeRequest } from "../../requestMethod";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import { toast } from "react-toastify";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.warning("Fill All This Fields Please 😍");
    }
    if (password.length < 6) {
      return toast.warning("Password less than 6 digits 🙄");
    }

    if (loading) return;
    setLoading(true);

    try {
      const res = await makeRequest.post("auth/login", { email, password });
      dispatch(setCredentials(res.data));
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      toast.success("Successful Login 😍");
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
        <div className="title">Login</div>
        <div className="content">
          <form onSubmit={handleLogin}>
            <div className="user-details">
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
            </div>

            {error && (
              <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
            )}

            <div className="button">
              <input
                type="submit"
                value={loading ? "Loading..." : "Login "}
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
