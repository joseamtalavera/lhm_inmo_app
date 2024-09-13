
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#FFA500" // hex colour for orange
        },
        secondary: {
            main: "#008000" // hex colour for green
        }
    }, 
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 960,
            lg: 1280,
            xl: 1536,
        }
    },
    typography:{
        h1: {
            '@media (max-width:600px)': {
                fontSize: '3rem',
            },
        },
        h2: {
            '@media (max-width:600px)': {
                fontSize: '2rem',
            },
        },
    },
});

export default theme;