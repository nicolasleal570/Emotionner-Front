import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./Services/auth.service";
import Login from "./Components/Forms/login-user-form";
import CalendarioView from "./Components/Views/calendarView";
import Register from "./Components/Forms/registration";
import EmotionsView from "./Components/Forms/emotions";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <Link to={"/"} className="navbar-brand">
            Emotionner
          </Link>
          <div className="navbar-nav mr-auto">
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Mi Calendario
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/emotions"} className="nav-link">
                  Mis Emociones
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Cerrar Sesión
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Iniciar Sesión
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/singup"} className="nav-link">
                  Crea una cuenta
                </Link>
              </li>
            </div>
          )}
        </nav>
            <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Route path="/profile" component={CalendarioView} />
            <Route path="/singup" component={Register} />
            <Route path="/emotions" component={EmotionsView} />
          </Switch>
          
      </div>
    </Router>
  );
};

export default App;