// Layout.tsx
import React from 'react';
import './layout.css';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer.tsx';
import Header from '../header/header.tsx'

function Layout() {
  return (
    <div className="App app_main">
      <div className="row">
        <div className="col-md-12">
          <Header />
         
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Outlet />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
