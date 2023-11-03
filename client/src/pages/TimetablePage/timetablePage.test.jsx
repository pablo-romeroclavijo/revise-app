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
   
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

    beforeEach(() => {
      render(< BrowserRouter > < TimetablePage/> </BrowserRouter>)
      localStorage.clear()
      getItemSpy.mockClear()
      setItemSpy.mockClear()
        
    })

   
   
    afterEach(() => {
        
    });

    

    
  
  
    it('should navigate to "/" if token is  null', () => {
      // const mockResponse = {
      //   "token" : "asdfqwer"
      // }
      // const mockResolveValue = { 
      //   ok: true,
      //   json: () => new Promise((resolve) => resolve(mockResponse))
      // };
      // fetchSpy.mockReturnValue(mockResolveValue);
      //localStorage.setItem("token", "asdfasdf")
        
       // expect(getItemSpy).toHaveBeenCalledTimes(1) 
      // expect(getItemSpy).toHaveBeenCalledWith("token")

       expect(window.location.href).toEqual('http://localhost:3000/');
    });


  });