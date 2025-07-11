import { createTheme } from "@mui/material";

const theme = createTheme();

export const customTypography = {
    fontFamily: [
        'Work Sans',
        'Inter',
        'sans-serif'
    ].join(','),
    h1: {
        fontSize: 64,
        fontWeight: 700,
        letterSpacing: '-2%',
        [theme.breakpoints.down('sm')]: {
            fontSize: 24,
        },
    },
    h2: {
        fontSize: 40,
        fontWeight: 700,
        letterSpacing: '-2%',
    },
    h3: {
        fontSize: 24,
        fontWeight: 700,
        letterSpacing: '-2%',
    },
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {
        fontSize: 24,
        fontWeight: 500,
        lineHeight: 1
    },
    subtitle2: {
        fontSize: 16,
        fontWeight: 700,
    }, // Body-Bold
    body1: {
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.4
    },
    body2: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.4
    }, // Small text
    button: {
        fontSize: 16,
        fontWeight: 700,
        letterSpacing: '4%',
        lineHeight: 1
    },
    caption: {},
    overline: {
        fontSize: 16,
        fontWeight: 700,
        textDecoration: 'underline',
    }
}