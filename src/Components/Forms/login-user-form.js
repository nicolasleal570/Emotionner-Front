import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Footer from "../Elements/footerOutside";
import AuthService from "../../Services/auth.service";
import { FormGroup } from "reactstrap";
import "./../../App.css";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo es requerido!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          props.history.push("/profile");
          // window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="blanco">
        <div className="container">
          <div className="cont">
            <div className="form sign-in">
              <h2 style={{ fontWeight: "inherit" }}>¡Bienvenido de Vuelta!</h2>
              <Form onSubmit={handleLogin} ref={form}>
                <FormGroup>
                  <label>
                    <span>Correo Electrónico</span>
                    <Input
                      type="text"
                      className="form-control input-1 input-2"
                      placeholder="Introduzca su correo"
                      name="email"
                      value={email}
                      onChange={onChangeEmail}
                      validations={[required]}
                      autocomplete="off"
                    ></Input>
                  </label>
                </FormGroup>
                <FormGroup>
                  <label>
                    <span>Contraseña</span>
                    <Input
                      type="password"
                      className="form-control input-1 input-2"
                      placeholder="Introduzca su contraseña"
                      name="password"
                      value={password}
                      onChange={onChangePassword}
                      validations={[required]}
                      autocomplete="off"
                    ></Input>
                  </label>
                </FormGroup>
                <FormGroup>
                  <div className="row">
                    <button
                      className="btn btn-primary submit"
                      disabled={loading}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Iniciar Sesión</span>
                    </button>
                  </div>
                </FormGroup>

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
                <div>
                  <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </div>
              </Form>
            </div>
            <div className="sub-cont">
              <div className="img">
                <div className="img__text m--up">
                  <h2 style={{ fontStyle: "oblique" }}>¿Nuevo por Aquí?</h2>
                  <p style={{ letterSpacing: "1px" }}>¡Regístrate Ahora!</p>
                </div>
                <div className="img__btn">
                  <span className="m--up">
                    <a
                      className="a-link-color"
                      href="/singUp"
                      style={{ borderWidth: "1.5px" }}
                    >
                      Registrarse
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ color: "#ededed" }}>
          <p>.</p>
          <p>.</p>
          <p>.</p>
          <p>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
