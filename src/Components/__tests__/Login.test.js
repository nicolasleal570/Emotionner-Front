import React, { Component } from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginPage from "../Forms/login-user-form";
import { shallow, mount } from "enzyme";

afterEach(cleanup);

describe("Login Page", () => {
  let wrapper;
  let alertSpy;

  beforeEach(() => {
    alertSpy = jest.spyOn(window, "alert");
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

  // Testing the password field change event
  it("should set the email value on change event", () => {
    const password = "password";
    expect(wrapper.find("#form")).toHaveLength(1);
    wrapper
      .find("#passwordField") // #passwordField es el id del campo de password
      .simulate("change", { target: { name: "password", value: password } });
    expect(wrapper.find("#passwordField").prop("value")).toEqual(password);
  });

  // Testing if the password is send without spaces
  it("should set the password value on change event with trim", () => {
    expect(wrapper.find("#form")).toHaveLength(1);
    wrapper.find("#passwordField").simulate("change", {
      target: {
        value: "some password with spaces",
      },
    });
    expect(wrapper.find("#passwordField").prop("value")).toEqual(
      "somepasswordwithspaces"
    );
  });

  it("onSubmit() should throw error if data is missing", () => {
    wrapper = mount(<LoginPage message="Some error" />);
    wrapper
      .find("#form")
      .hostNodes()
      .simulate("submit", {
        preventDefault: () => {},
      });
    expect(wrapper.find("#alertDanger")).toHaveLength(1);
  });
});
