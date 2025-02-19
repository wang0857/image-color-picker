import { createTheme, ThemeOptions } from "@mui/material";
import { darkPalettes, lightPalettes } from "./CustomPalettes";
import { customComponents } from "./CustomComponents";
import { customTypography } from "./CustomTypography";

/**
 * Light theme for MUI
 */
const lightTheme: ThemeOptions = {
    palette: lightPalettes,
    components: customComponents,
    typography: customTypography
}

export const customLightTheme = createTheme(lightTheme)

/**
 * Dark theme for MUI
 */
const darkTheme: ThemeOptions = {
    palette: darkPalettes,
    components: customComponents,
    typography: customTypography
}

export const customDarkTheme = createTheme(darkTheme)