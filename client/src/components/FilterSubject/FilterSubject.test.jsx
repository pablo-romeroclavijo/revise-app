import React  from "react";
import {screen,render, cleanup,fireEvent, wait } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';


import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

import { describe, it } from "vitest";
import { beforeEach } from "node:test";
import FilterSubject from ".";

describe('FilterSubject', () => { 
   

    beforeEach(() => {
        render( <BrowserRouter > <FilterSubject/> </BrowserRouter>)
    } )
    
    afterEach(() => {
        cleanup()
    });

    it('should load',() => {
        

        
    })

 })