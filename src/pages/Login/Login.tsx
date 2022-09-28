import "./Login.css";
import Context from "../../components/Context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser, PasswordsContextType } from "../../models";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [logInFormIsIncorrect, setLogInFormIsIncorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { users, logInUser, currentUser } = useContext(Context) as PasswordsContextType;

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    const account = users.find((user:IUser) => user.username === username);
    if (account && account.password === password) {
      logInUser(account);
      setLogInFormIsIncorrect(false);
      navigate("/dashboard", { state: currentUser });
    } else if (!account) {
      setLogInFormIsIncorrect(true);
      setErrorMessage(`Usuário com nome "${username}" não foi encontrado!`);
    } else if (username.trim() === "" || password.trim() === "") {
      // empty input fields
      setLogInFormIsIncorrect(true);
      setErrorMessage("Wrong Credentials!");
    } else {
      // wrong password was entered
      setLogInFormIsIncorrect(true);
      setErrorMessage("Password is incorrect!");
    }
  };
  return (
    <div className="loginForm">
      <p>
        <b>Entrar</b>
      </p>
      <div className="register">
        Não registrado ainda? <a href="/register">Inscrever-se</a>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Username"
          placeholder="Login"
          value={username}
          onChange={(e) => {
            setLogInFormIsIncorrect(false);
            setUserName(e.target.value);
          }}
        />
        <br />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          onChange={(e) => {
            setLogInFormIsIncorrect(false);
            setPassword(e.target.value);
          }}
        />
        <br />
        {!logInFormIsIncorrect ? null : (
          <div className="formIsIncorrect">{errorMessage}</div>
        )}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};
export default Login;
