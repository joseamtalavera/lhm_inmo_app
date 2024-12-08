
import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  PeopleOutline as UsersIcon,
  //CalendarTodayOutlined as CalendarIcon,
  //BookOutlined as BookingsIcon,
  //ReceiptOutlined as InvoicingIcon,
  //BuildOutlined as MaintenanceIcon,
  //StarBorderOutlined as ReviewsIcon,
  BusinessOutlined as CentresIcon,
  //LocalOfferOutlined as ProductIcon,
  SettingsOutlined as SettingsIcon,
  HelpOutline as HelpIcon,
  DashboardOutlined as DashboardIcon,
  PowerSettingsNewOutlined as LogoutIcon,
} from '@mui/icons-material';


 export const listItems = [
    { text: 'Dashboard', icon: <DashboardIcon sx={{fontSize: 20}} />, path: '/dashboard'},
    { text: 'Clientes', icon: <UsersIcon sx={{fontSize: 20}} />, path: '/dashboard/clientes'},
    /* { text: 'Calendar', icon: <CalendarIcon sx={{fontSize: 20}} />, path: '/dashboard/admin/calendar'},
    { text: 'Bookings', icon: <BookingsIcon sx={{fontSize: 20}} /> },
    { text: 'Invoicing', icon: <InvoicingIcon sx={{fontSize: 20}} /> }, */
];

const handleLogout = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    console.log('Logout response:', response);

    if (response.ok) {
      console.log('Logout successful');
      window.location.href = '/login';
    } else {
      console.log('Logout failed');
    }
  } catch (error) {
      console.error('Error during logout:', error);
    }
};
    


export const moreItems = [
   /*  { text: 'Maintenance', icon: <MaintenanceIcon sx={{fontSize: 20}} /> },
    { text: 'Reviews', icon: <ReviewsIcon sx={{fontSize: 20}} /> }, */
    { text: 'Propiedades', icon: <CentresIcon sx={{fontSize: 20}} />, path: '/dashboard/propiedades'},
    // { text: 'Product', icon: <ProductIcon sx={{fontSize: 20}} /> },
    { text: 'Settings', icon: <SettingsIcon sx={{fontSize: 20}} />, path: '/dashboard/settings'},
    { text: 'Ayuda', icon: <HelpIcon sx={{fontSize: 20}} />, path: '/dashboard/ayuda'},
    { text: 'Logout', icon: <LogoutIcon sx={{fontSize: 20}} />, onClick: handleLogout},
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

/* export const secondaryListItems = (
  <React.Fragment>
    {moreItems.map((item) => (
      <ListItemButton component={Link} to={item.path} key={item.text}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    ))}
  </React.Fragment>
); */

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