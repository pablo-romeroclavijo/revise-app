import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import {TimetablePage, LoginPage, NotFoundPage, SignUpPage, SharedPage} from './pages'
import {NavBar} from './components'
const App = () => {
  return(
  <>
    

    <Routes>
      <Route path="/">
        <Route path="/" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path='timetable' element={<NavBar />}>
            <Route index element={<TimetablePage />}/>
        </Route>
        <Route path="/timetable/:id" element={<SharedPage />}/>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </>
  )
};

export default App;