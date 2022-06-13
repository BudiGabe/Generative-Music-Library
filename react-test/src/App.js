import './App.css';
import React from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/Homepage';
import TopSamples from './components/TopSamples';
import Register from './components/Register';
import Pagenotfound from './components/Pagenotfound';
import NewSamples from "./components/NewSamples";
import Combine from "./components/Combine";

function App() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/topsamples" element={<TopSamples/>}/>
                <Route path="/newsamples" element={<NewSamples/>}/>
                <Route path="/combine" element={<Combine/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="*" element={<Pagenotfound/>}/>
            </Routes>
        </div>
    );
}

export default App;
