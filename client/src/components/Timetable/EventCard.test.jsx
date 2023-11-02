import React  from "react";
import {screen,render, cleanup,fireEvent, wait } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

import Timetable    from ".";
import { describe, it } from "vitest";
import { beforeEach } from "node:test";

describe('TimeTable', () => { 
    const fetchSpy = vi.spyOn(global, 'fetch');
    
    afterEach(() => {
        fetchSpy.mockRestore();
    });

    it('',() => {
        <BrowserRouter > <Timetable/> </BrowserRouter>
    } )

 })