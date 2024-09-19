import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/layout.tsx'
import SigninPage from '../src/pages/authentications/signin/signin.tsx';
import Dashbord from './pages/content/dashbord/dashbord.tsx'
import PrivateRoute from './_auth/privateRoute.tsx';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<SigninPage />} /> */}
          <Route path="/" element={<PrivateRoute path="dashbord" component={Layout} />} >
            <Route index path="" element={<PrivateRoute path="dashbord" component={Dashbord} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
