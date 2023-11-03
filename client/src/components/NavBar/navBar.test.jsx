import React from 'react';
import { screen, fireEvent, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import NavBar from '.';
import { describe } from 'vitest';

describe("navBar",() => {
    beforeEach(() => {
        render(<BrowserRouter><NavBar /></BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    it('the heading has the appropriate amount of links', () => {
        const navigation = screen.getByRole('navigation');
        expect(navigation).toBeInTheDocument();
        expect(navigation.children.length).toBe(2)
    });
} )