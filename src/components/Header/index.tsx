import { Typography, useMediaQuery, useTheme } from "@mui/material";

function Header() {
    // RWD related
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <Typography
            className="cp-header"
            variant="h1"
            textAlign="center"
            sx={{ mt: isMobile ? 4 : 0 }}
        >
            Color Picker from Image
        </Typography>
    );
}

export default Header;