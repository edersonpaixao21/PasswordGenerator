import "./Dashboard.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../components/Context";
import { PasswordsContextType } from "../../models";
import { PasswordsList } from "../../components/PasswordsList";

const Dashboard = () => {
  const { signOut, currentUser, funcs } = useContext(Context) as PasswordsContextType;
  const [resource, setResource] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    funcs.addPassword({ resource, password });
    setResource("");
    setPassword("");
  };

  function onSignOut() {
    signOut();
    navigate("/");
  }

  function handlePassInput(e: React.FormEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  function handleResInput(e: React.FormEvent<HTMLInputElement>) {
    setResource(e.currentTarget.value);
  }

  if (!currentUser) {
    return (
      <div>
        <p>Por favor entre!</p>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="leftPanel">
          <div className="avatarCircle">
            {currentUser.username.charAt(0).toUpperCase()}
          </div>
          <p>{currentUser.username}</p>
          <button onClick={() => onSignOut()}>Sair</button>
        </div>
        <div className="mainPanel">
          <p>Minhas Senhas Salvas</p>
          <hr />
          <div className="password-form">
            <h5>Digite o recurso e a senha para salvá-lo</h5>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Recurso"
                type="text"
                value={resource}
                onChange={handleResInput}
              />
              <input
                placeholder="Senha"
                type="text"
                value={password}
                onChange={handlePassInput}
              />
              <input type="submit" hidden />
            </form>
          </div>
          {currentUser.passwordsBase.length ? (
            <PasswordsList passwords={currentUser.passwordsBase} />
          ) : (
            <h5 className="password-form">Ainda não há senhas!</h5>
          )}
        </div>
      </div>
    );
  }
};
export default Dashboard;
