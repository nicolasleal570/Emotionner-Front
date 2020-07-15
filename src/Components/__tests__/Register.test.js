import React, { Component } from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RegistrationPage from "../Forms/registration";
import { validEmail } from "../Forms/registration";
import { shallow, mount, render } from "enzyme";
import { isEmail } from "validator";


afterEach(cleanup);

describe("registration page", () => {



    let wrapper;
    let wrapper2;
    let alertSpy;

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    beforeEach(() => {
        alertSpy = jest.spyOn(window, "alert");
        wrapper = shallow(<RegistrationPage />);
    });

    // Testing the email field change event
    it("should set the email value on change event", () => {
        const email = "prueba@email.com"; // Texto de prueba
        expect(wrapper.find("#form")).toHaveLength(1); // #form es el id que le puse al form para poder encontrarlo
        wrapper
            .find("#emailField") // #emailField es el id del campo email
            .simulate("change", { target: { name: "email", value: email } });
        expect(wrapper.find("#emailField").prop("value")).toEqual(email);
    });

    it("should check the email value is correct", () => {
        const email = "asd"; // password incorrecta
        wrapper
            .find("#emailField")
             // #passwordfield es el id del campo passsword
            .simulate("change", { target: { name: "email", value: email } });

            wrapper
            .find("#namefield")
             // #passwordfield es el id del campo passsword
            .simulate("click");
            expect(wrapper.find("#emailField").childAt(0)).toEqual(validEmail(email));


    });

    it("should set the name value on change event", () => {
        const name = "samu"; // Texto de prueba
        expect(wrapper.find("#form")).toHaveLength(1);
        wrapper
            .find("#namefield") // #namefield es el id del campo name
            .simulate("change", { target: { name: "name", value: name } });
        expect(wrapper.find("#namefield").prop("value")).toEqual(name);
    });

    it("should set the last name value on change event", () => {
        const lname = "perez"; // Texto de prueba
        expect(wrapper.find("#form")).toHaveLength(1);
        wrapper
            .find("#lnamefield") // #lnamefield es el id del campo lname
            .simulate("change", { target: { name: "lastname", value: lname } });
        expect(wrapper.find("#lnamefield").prop("value")).toEqual(lname);
    });

    it("should set the password value on change event", () => {
        const pw = "123123"; // Texto de prueba
        expect(wrapper.find("#form")).toHaveLength(1); // #form es el id que le puse al form para poder encontrarlo
        wrapper
            .find("#passwordfield") // #passwordfield es el id del campo passsword
            .simulate("change", { target: { name: "password", value: pw } });
        expect(wrapper.find("#passwordfield").prop("value")).toEqual(pw);
    });

    it("should check the password value is correct", () => {
        const pw = "asd"; // password incorrecta
        wrapper
            .find("#passwordfield") // #passwordfield es el id del campo passsword
            .simulate("change", { target: { name: "password", value: pw } });
        expect(wrapper.find("#alertpass")).toHaveLength(1);

    });

    it("should set the birthdate value on change event", () => {
        const bday = new Date("2016-08-15"); // Texto de prueba
        expect(wrapper.find("#form")).toHaveLength(1); // #form es el id que le puse al form para poder encontrarlo
        wrapper
            .find("#bdayfield") // #bdayfield es el id del campo birthdate
            .simulate("change", { target: { name: "birthdate", value: bday } });
        expect(wrapper.find("#bdayfield").prop("value")).toEqual(bday);
    });

    it("should not be able to set the birthdate value further than today", () => {
        const bday = new Date("2021-08-15"); // Texto de prueba
        expect(wrapper.find("#form")).toHaveLength(1); // #form es el id que le puse al form para poder encontrarlo
        wrapper
            .find("#bdayfield") // #bdayfield es el id del campo birthdate
            .simulate("change", { target: { name: "birthdate", value: bday } });
        expect(wrapper.find("#bdayfield").prop("value")).not.toEqual(bday);
    });


    it("onSubmit() should throw error if data is missing", () => {
        wrapper = mount(<RegistrationPage message="Some error" />);
        wrapper
            .find("#form")
            .hostNodes()
            .simulate("submit", {
                preventDefault: () => { },
            });
        expect(wrapper.find("#alertt")).toHaveLength(5);
    });

    it("should not be able to register an already existing email", () => {
        jest.spyOn(window, 'alert').mockImplementation(() => { console.log(window.alert) });

        const email = "menor@email.com"; // email existente
        wrapper
            .find("#emailField") // #emailField es el id del campo email
            .simulate("change", { target: { name: "email", value: email } });

        const name = "samu"; // Texto de prueba
        wrapper
            .find("#namefield") // #namefield es el id del campo name
            .simulate("change", { target: { name: "name", value: name } });
        const lname = "perez"; // Texto de prueba
        wrapper
            .find("#lnamefield") // #lnamefield es el id del campo lname
            .simulate("change", { target: { name: "lastname", value: lname } });
        const pw = "123123"; // Texto de prueba
        wrapper
            .find("#passwordfield") // #passwordfield es el id del campo passsword
            .simulate("change", { target: { name: "password", value: pw } });
        expect(wrapper.find("#passwordfield").prop("value")).toEqual(pw);
        const bday = new Date("2016-08-15"); // Texto de prueba
        wrapper
            .find("#bdayfield") // #bdayfield es el id del campo birthdate
            .simulate("change", { target: { name: "birthdate", value: bday } });
        const formWrapper = wrapper.find("#form");
        formWrapper.simulate("submit(click)", {
            preventDefault: () => {},
          });
          console.log(window.alert)
          expect(window.alert).toBeCalledWith(expect.stringMatching("Failed! Email is already in use!" ));
    });

    it("should be able to register a new user", () => {
        const alerta = jest.spyOn(window, 'alert').mockImplementation(() => { });


        const random = makeid(5)
        const email = random + "@email.com"; // email no existente
        wrapper
            .find("#emailField") // #emailField es el id del campo email
            .simulate("change", { target: { name: "email", value: email } });

        const name = "samu"; // Texto de prueba
        wrapper
            .find("#namefield") // #namefield es el id del campo name
            .simulate("change", { target: { name: "name", value: name } });
        const lname = "perez"; // Texto de prueba
        wrapper
            .find("#lnamefield") // #lnamefield es el id del campo lname
            .simulate("change", { target: { name: "lastname", value: lname } });

        const pw = "123123"; // Texto de prueba
        wrapper
            .find("#passwordfield") // #passwordfield es el id del campo passsword
            .simulate("change", { target: { name: "password", value: pw } });
        expect(wrapper.find("#passwordfield").prop("value")).toEqual(pw);

        const bday = new Date("2016-08-15"); // Texto de prueba
        wrapper
            .find("#bdayfield") // #bdayfield es el id del campo birthdate
            .simulate("change", { target: { name: "birthdate", value: bday } });
        const formWrapper = wrapper.find("#form");
        
        formWrapper.simulate("submit(click)", {
            preventDefault: () => {},
          });
          
        expect(alerta).toBeCalledWith(expect.not.stringMatching("Failed! Email is already in use!" ));
    });


})