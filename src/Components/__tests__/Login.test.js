import React, { Component } from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginPage from "../Forms/login-user-form";
import { shallow, mount } from "enzyme";

afterEach(cleanup);

describe("Login Page", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoginPage />);
  });

  // Testing the email field change event
  it("should set the email value on change event", () => {
    const email = "nico@email.com"; // Texto de prueba
    expect(wrapper.find("#form")).toHaveLength(1); // #form es el id que le puse al form para poder encontrarlo
    wrapper
      .find("#emailField") // #emailField es el id del campo email
      .simulate("change", { target: { name: "email", value: email } });
    expect(wrapper.find("#emailField").prop("value")).toEqual(email);
  });

  // Testing if the email is a valid email
  it("should handle error when the email is not valid", () => {
    wrapper = mount(<LoginPage />);
    const email = "nico"; // Texto de prueba
    const password = "password";

    expect(wrapper.find("#idValidation2")).toHaveLength(0);
    wrapper
      .find("#emailField")
      .hostNodes()
      .simulate("change", { target: { name: "email", value: email } });
    wrapper
      .find("#passwordField")
      .hostNodes()
      .simulate("change", { target: { name: "password", value: password } });
    wrapper
      .find("#form")
      .hostNodes()
      .simulate("submit", {
        preventDefault: () => {},
      });
    expect(wrapper.find("#idValidation2")).toHaveLength(1);
    expect(wrapper.find("#idValidation2")).stringContaining(
      "Este no es un email válido, porfavor ingrese una dirección valida."
    );
  });

  // Testing the password field change event
  it("should set the password value on change event", () => {
    const password = "password";
    expect(wrapper.find("#form")).toHaveLength(1);
    wrapper
      .find("#passwordField") // #passwordField es el id del campo de password
      .simulate("change", { target: { name: "password", value: password } });
    expect(wrapper.find("#passwordField").prop("value")).toEqual(password);
  });

  // Testing if the password is send without spaces
  it("should set the password value on change event without blank spaces", () => {
    wrapper = mount(<LoginPage />);
    wrapper
      .find("#passwordField")
      .hostNodes()
      .simulate("change", {
        target: {
          value: "some password with spaces",
        },
      });
    expect(wrapper.find("#passwordField").hostNodes().prop("value")).toEqual(
      "somepasswordwithspaces"
    );
  });

  // Testing if the password have length greather than 6 characters
  it("should handle error when the password length greather than 6 characters", () => {
    wrapper = mount(<LoginPage />);
    const email = "nico@email.com";
    const password = "pass";
    wrapper
      .find("#emailField")
      .hostNodes()
      .simulate("change", {
        target: {
          value: email,
        },
      });
    wrapper
      .find("#passwordField")
      .hostNodes()
      .simulate("change", {
        target: {
          value: password,
        },
      });
    wrapper
      .find("#form")
      .hostNodes()
      .simulate("submit", {
        preventDefault: () => {},
      });
    expect(wrapper.find("#idValidation2")).toHaveLength(1);
    expect(wrapper.find("#idValidation2")).stringContaining(
      "La contraseña debe tener de 6 a 40 caracteres."
    );
  });

  it("should throw error if data is missing", () => {
    wrapper = mount(<LoginPage />);
    wrapper
      .find("#form")
      .hostNodes()
      .simulate("submit", {
        preventDefault: () => {},
      });
    expect(wrapper.find("#idValidation2")).toHaveLength(2);
  });
});
