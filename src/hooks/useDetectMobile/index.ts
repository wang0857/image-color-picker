import { useMediaQuery, useTheme } from "@mui/material";

/**
 * Custom hook to detect the current device type (mobile, tablet, or desktop)
 * based on the MUI theme's breakpoints.
 *
 * @returns {{
 *   isMobile: boolean,   // true if screen is smaller than 'sm'
 *   isTablet: boolean,   // true if screen is between 'sm' and 'md'
 *   isDesktop: boolean   // true if screen is 'md' or larger
 * }}
 *
 * Usage:
 * ```ts
 * import { useDetectDevice } from '[path to useDetectDevice]';
 * const { isMobile, isTablet, isDesktop } = useDetectDevice();
 * ```
 */
export function useDetectDevice() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px–899px
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // ≥900px

  return { isMobile, isTablet, isDesktop };
}
