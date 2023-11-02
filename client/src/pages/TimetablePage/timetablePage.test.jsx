import React  from "react";
import {screen,render, cleanup,fireEvent, wait } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';



import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

import TimetablePage    from ".";
import { beforeEach } from "vitest";
import LoginPage from "../LoginPage";




  
  // Mock the localStorage methods
 
  
  describe('timetable', () => {

    it('should navigate to "/" if token is null', () => {

      render(< BrowserRouter > < LoginPage/> </BrowserRouter>)
    });
  
    it('should navigate to "/timetable" if token is not null', () => {
      render(< BrowserRouter > < TimetablePage/> </BrowserRouter>)
    });
  });