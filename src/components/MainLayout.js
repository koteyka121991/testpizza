import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => {
    return (
        <div className="wrapper">
        <Header />
        <div className="content">
        {/* Outlet используют в родительских элементах маршрута для отображения 
        их дочерних элементов маршрута */}
        <Outlet />
        </div>
      </div>
    );
}

export default MainLayout;
