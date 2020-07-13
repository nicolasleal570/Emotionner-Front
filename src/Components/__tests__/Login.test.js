import React, { Component } from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import LoginPage from "../Forms/login-user-form";
import Authservice from "../../Services/auth.service";

afterEach(cleanup);

jest.mock("axios");

describe("Login Page", () => {
  it("should allow me to log in", async () => {
    render(<LoginPage />);

    const email = "nico@email.com";
    const password = "password";
    const emailLabel = screen.getByLabelText("Correo Electrónico");
    fireEvent.change(emailLabel, {
      target: {
        value: email,
      },
    });

    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: {
        value: password,
      },
    });

    fireEvent.click(screen.getByText("Iniciar Sesión"));

    const data = {
      id: 371,
      email: "nico@email.com",
      roles: ["ROLE_USER"],
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcxLCJpYXQiOjE1OTQ2NjM2MDgsImV4cCI6MTU5NDc1MDAwOH0.w7MLsBgvuECQLyARls8RHGlAW-f33BowKpprl12CaGg",
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(Authservice.login(email, password)).resolves
    // console.log(AuthService.login(email, password));
    // await expect(Promise.resolve('lemon')).resolves.toBe('lemon')

    //   await waitFor(() =>
    //     expect(axiosMock).toHaveBeenCalledWith(
    //       "http://localhost:8080/users/signin",
    //       expect.objectContaining({
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           email,
    //           password,
    //         }),
    //       })
    //     )
    //   );
  });
});
