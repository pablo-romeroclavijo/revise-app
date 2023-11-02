import React  from "react";
import {screen,render, cleanup,fireEvent, wait } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';



import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

import TimetablePage    from ".";
import { afterEach, beforeEach, describe, it } from "vitest";
import LoginPage from "../LoginPage";



  describe('timetable', () => {
   

    beforeEach(() => {
        render(< BrowserRouter > < TimetablePage/> </BrowserRouter>)
        localStorage.clear()
        
    })

   
  
    it('should navigate to "/timetable" if token is not null', () => {
        //localStorage.setItem('token', "asdfasdf")
        
       // expect(getItemSpy).toHaveBeenCalledTimes(1)
        render(< BrowserRouter > < TimetablePage/> </BrowserRouter>)

    });
  });