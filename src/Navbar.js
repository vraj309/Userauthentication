import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Navigate, useNavigate } from 'react-router-dom';

const NavBar = ({ user,onLogout }) => {
  const navigate = useNavigate();
  const logout = async () => {
  
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    navigate('/Home');
  };
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      url: '/Home',
    },
    user
      ? {
          label: 'Logout',
          icon: 'pi pi-fw pi-power-off',
          command: onLogout,
        }
      : {
          label: 'Login',
          icon: 'pi pi-fw pi-user',
          url: '/login',
        },
        {
            label: 'Public',
            icon: ' pi pi-users',
            url: '/Public',
          },
          {
            label: 'User',
            icon: 'pi pi-fw pi-user',
            url: '/login',
          }      
  ];
  
  const end = (
    <Button label="Logout" icon="pi pi-fw pi-power-off"  severity="danger" onClick={logout} />
  );

  return (
    <div className="nav-bar">
      <Menubar model={items} end={end} />
    </div>
  );
};

export default NavBar;
