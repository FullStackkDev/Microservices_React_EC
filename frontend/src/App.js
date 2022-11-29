import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './screens/login'
import Signup from './screens/signup'
import Home from './screens/home'
import Details from './screens/details'
import OTP from './screens/otp'

export default function App(){
    return(
        <Router>
            <Routes>
                <Route exact path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/verification' element={<OTP/>}/>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path="/:id" element={<Details/>}/>
            </Routes>
        </Router>
    )
}