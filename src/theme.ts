// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#147382',
        },
        secondary: {
            main: '#fcdf52',
        },
        background: {
            default: '#2f3235', // Dark background
            paper: '#1e1e1e', // Dark paper
        },
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    verticalAlign: 'top',
                    border: 'none',
                    padding: '0px 20px 20px 0',
                    margin: '0'
                }
            }
        }
    }

    });

export default theme;

