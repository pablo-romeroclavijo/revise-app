import React  from "react";
import {screen,render, cleanup,fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'

expect.extend(matchers)

import  NotFoundPage   from ".";

describe("NotFound page", () => {
    beforeEach(() => {
    render(< BrowserRouter > < NotFoundPage/> </BrowserRouter>)
    });

    afterEach(() => {
        localStorage.clear()
        cleanup();
    })

    it("Display a Heading with Not found text", () => {
        const elem = screen.getByRole("heading");
        expect(elem).toBeInTheDocument();
        expect(elem.textContent).toBe("404: Page not found")
    })
    
})
