import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import BurgerMenuButton from './BurgerButton';
import { Link, useLocation } from 'react-router-dom';

//mui Icons
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';

const LargerHomeIcon = styled(HomeIcon)({
    fontSize: 37,
    //   color: 'blue'
});
const LargerContactIcon = styled(ContactsIcon)({
    fontSize: 37,
    color: ''

});

const LargerInfoIcon = styled(Groups2TwoToneIcon)({
    fontSize: 37,
      color: '#333'
});
const LargerLoginTwoToneIcon = styled(LoginTwoToneIcon)({
    fontSize: 37,
      color: '#333'
});

export default function Burger() {

    const { pathname } = useLocation()

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 340 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div style={{
                padding: 10,
                borderBottom: '1px solid #888',
            }}>
                <h2>Exclusive</h2>
            </div>
            <div style={{
                padding: '50px 0 0 30px',
                color: '#000',
            }}>
                <Link to="/">
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 22,
                        color: '#000',
                        marginBottom: 26
                    }}>
                        <LargerHomeIcon />
                        <h3>Home</h3>
                    </div>
                </Link>
                <Link to="contact">
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 22,
                        color: '#000',
                        marginBottom: 26
                    }}>
                        <LargerContactIcon />
                        <h3>Contact</h3>
                    </div>
                </Link>
                <Link to="about">
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 22,
                        color: '#000',
                        marginBottom: 26
                    }}>
                        <LargerInfoIcon />
                        <h3>About</h3>
                    </div>
                </Link>
                <Link to="login">
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 22,
                        color: '#000',
                        marginBottom: 26
                    }}>
                        <LargerLoginTwoToneIcon />
                        <h3>Login</h3>
                    </div>
                </Link>
            </div>
        </Box>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <span onClick={toggleDrawer(anchor, true)}>
                        <BurgerMenuButton />
                    </span>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
