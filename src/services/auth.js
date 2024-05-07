import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function LoginService(userData) {
  try {
    const { token, companyId } = await axios.post(
      `${process.env.REACT_APP_API}/security/auth`,
      JSON.stringify(userData)
    );

    if (token) {
      const userJwt = jwtDecode(token);
      const info = { ...userJwt, token, companyId };
      localStorage.setItem("authUser", JSON.stringify({ ...info }));
      return true;
    }
  } catch (err) {
    console.log("ererer", err);
  }
}
