import React  from "react";
import {screen,render, cleanup,fireEvent, wait } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

import FilterTheme    from ".";
import { describe } from "vitest";


describe('check',() => {
    beforeEach(() => {
        render(
            <BrowserRouter>
              <FilterTheme />
            </BrowserRouter>
        );

    })
    it('when chenged theme is change', () => {
        //const themeButton = screen.getById('select')
        
    })
} )