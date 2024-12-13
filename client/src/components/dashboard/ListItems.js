import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  PeopleOutline as UsersIcon,
  BusinessOutlined as CentresIcon,
  SettingsOutlined as SettingsIcon,
  HelpOutline as HelpIcon,
  DashboardOutlined as DashboardIcon,
  PowerSettingsNewOutlined as LogoutIcon,
} from '@mui/icons-material';

export const listItems = [
  { text: 'Dashboard', icon: <DashboardIcon sx={{fontSize: 20}} />, path: '/dashboard' },
  { text: 'Clientes', icon: <UsersIcon sx={{fontSize: 20}} />, path: '/dashboard/clientes' },
];

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const moreItems = [
  { text: 'Propiedades', icon: <CentresIcon sx={{fontSize: 20}} />, path: '/dashboard/propiedades' },
  { text: 'Settings', icon: <SettingsIcon sx={{fontSize: 20}} />, path: '/dashboard/settings' },
  { text: 'Ayuda', icon: <HelpIcon sx={{fontSize: 20}} />, path: '/dashboard/ayuda' },
  { text: 'Logout', icon: <LogoutIcon sx={{fontSize: 20}} />, onClick: handleLogout },
];

export const mainListItems = (
  <React.Fragment>
    {listItems.map((item) => (
      <ListItemButton component={Link} to={item.path} key={item.text}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    ))}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {moreItems.map((item) => (
      item.text !== 'Logout' ? (
        <ListItemButton component={Link} to={item.path} key={item.text}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ) : (
        <ListItemButton onClick={item.onClick} key={item.text}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      )
    ))}
  </React.Fragment>
);