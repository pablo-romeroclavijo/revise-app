import React  from "react";
import {screen,render, cleanup,fireEvent, wait } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';



import * as matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'

expect.extend(matchers)

import  LoginPage   from ".";
import TimetablePage from "../TimetablePage";
import { stringify } from "uuid";



describe("Login page", () => {

    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
    //Spy on the global fetch function
    const fetchSpy = vi.spyOn(global, 'fetch');
    
    beforeEach(() => {
        render(< BrowserRouter > < LoginPage/> </BrowserRouter>)
        fetchSpy.mockRestore();
    });

    afterEach(() => {
        cleanup();
        localStorage.clear()
        getItemSpy.mockClear()
        setItemSpy.mockClear()

    })

    it("Display a Heading with Login text", () => {
        const elem = screen.getByRole("heading");
        expect(elem).toBeInTheDocument();
        expect(elem.textContent).toBe("Login")
    })
    it("should render the username and passwordtext" ,() => {
        const username = screen.getByPlaceholderText("Username");
        const password = screen.getByPlaceholderText("Password");
        expect(username).toBeInTheDocument()
        expect(password).toBeInTheDocument()
    })
    
    it("when useranme and password is given wrong should show a alart",async() => {
        
        const userName = screen.getByPlaceholderText("Username");
        const password = screen.getByPlaceholderText("Password");
        const loginButton = screen.getByRole("button");

        fireEvent.change(userName, { target: { value: 'testuser' } });
        fireEvent.change(password, { target: { value: 'testpassword' } });

        fireEvent.click(loginButton);

        const mockResponse = {
            "token": "asdf",      
        }
        const mockResolveValue = { 
            ok: true,
            json: () => new Promise((resolve) => resolve(mockResponse))
        };
        fetchSpy.mockReturnValue(mockResolveValue);
        localStorage.setItem("token", JSON.stringify([mockResponse]))
        render(<BrowserRouter><TimetablePage /></BrowserRouter>)
        // // Assert that the alert message is displayed
        // expect(screen.getByText("ur not logged in")).toBeInTheDocument();
    })

    it('when username and password are correct should navigate to timetable', async () => {
        
        const userName = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button');
    
        fireEvent.change(userName, { target: { value: 'admin123' } });
        fireEvent.change(password, { target: { value: 'admin123' } });
    
        fireEvent.click(loginButton);
    
        // Assuming your component sets a localStorage item on successful login
        //expect(localStorage.setItem).toBeCalledTimes(1)
        })

        it("when clicked take you to signup", () => {
            
        })
    
})