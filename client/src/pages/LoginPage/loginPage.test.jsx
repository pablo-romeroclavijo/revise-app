import React  from "react";
import {screen,render, cleanup,fireEvent, wait } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';



import * as matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'

expect.extend(matchers)

import  LoginPage   from ".";
import TimetablePage from "../TimetablePage";



describe("Login page", () => {

    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
    //Spy on the global fetch function
    global.fetch = vi.fn()

    function createFetchResponse(data) {
        return { 
            json: () => new Promise((resolve) => resolve(data)) 
        }
      }
    
    beforeEach(() => {
        render(< BrowserRouter > < LoginPage/> </BrowserRouter>)
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
    
    it("when useranme and password is given right should navitae to timetable",async() => {
        
        const userName = screen.getByPlaceholderText("Username");
        const password = screen.getByPlaceholderText("Password");
        const loginButton = screen.getByRole("button",{name: "Login"});

        fireEvent.change(userName, { target: { value: 'testuser' } });
        fireEvent.change(password, { target: { value: 'testpassword' } });


        fireEvent.click(loginButton);
        const mockResponse = {
            "token": "asdfasdf",      
        }

        
        expect(window.location.href).toEqual('http://localhost:3000/');

        fetch.mockResolvedValue(createFetchResponse(mockResponse))
       
        localStorage.setItem("token", JSON.stringify([mockResponse]))
        render(<BrowserRouter><TimetablePage /></BrowserRouter>)
        expect(window.location.href).toEqual('http://localhost:3000/timetable');

        // // Assert that the alert message is displayed
        // expect(screen.getByText("ur not logged in")).toBeInTheDocument();

    })

    it('when username and password are wrong should navigate to timetable', async () => {
        
        const userName = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole("button", { name: "Login"});
    
        fireEvent.change(userName, { target: { value: 'admin123' } });
        fireEvent.change(password, { target: { value: 'admin123' } });
    
        fireEvent.click(loginButton);
        
        const mockResponse = {
            "error": "not found user",      
        }
        
       fetch.mockResolvedValue(createFetchResponse(mockResponse))
    
        expect(window.location.href).toEqual('http://localhost:3000/timetable');



        })

        it("when clicked take you to signup", () => {
            const signUp = screen.getByText(`No Account`);
            fireEvent.click(signUp)
            expect(window.location.href).toEqual('http://localhost:3000/signup');


        })
    
})