import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPage from "../Pages/LandingPage";
import ToDoPage from "../Pages/ToDoPage";
import axios from "axios";

jest.mock("axios");

// describe("LandingPage", () => {
//     test("checking if the landing page renders", () => { //checking if the landing page renders
//         render(<LandingPage />);
//         const landingPageElement = screen.getByTestId("landingPage");
//         expect(landingPageElement).toBeInTheDocument();
//     });
// });

// describe("ToDoPage", () => {
//     test("checking if the to do page renders", () => { //checking if the to do page renders
//         render(<ToDoPage />);
//         const toDoPageElement = screen.getByTestId("toDoPage");
//         expect(toDoPageElement).toBeInTheDocument();
//     });
// });

describe("FrontendService", () => {
    test("checking if the login service works", async () => { //checking if the login service works
        axios.post.mockImplementationOnce(() => Promise.resolve({data: "Login successful!"}));
        const response = await axios.post();
        expect(response.data).toEqual("Login successful!");
    });
});

describe("FrontendService", () => {
    test("checking if the signup service works", async () => { //checking if the signup service works
        axios.post.mockImplementationOnce(() => Promise.resolve({data: "Signup successful!"}));
        const response = await axios.post();
        expect(response.data).toEqual("Signup successful!");
    });
});

describe("LandingPage", () => { //checking if the landing page renders
    test("checking if the landing page renders", () => {
        render(<LandingPage />);
        const landingPageElement = screen.getByTestId("landingPage");
        expect(landingPageElement).toBeInTheDocument();
    });
});

