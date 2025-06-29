import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback, Header, MainContent } from "./components"
import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import { customDarkTheme, customLightTheme } from "./themes";

function App() {
  const [isDark, _setIsDark] = useState(true);

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) =>
        <ErrorFallback
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          buttonLabel="You got this!"
          fallbackHandler={() => console.log('Hit the custom fallback handler.')}
        />
      }
    >
      <ThemeProvider theme={isDark ? customDarkTheme : customLightTheme}>
        <CssBaseline>
          <Box
            className="cp-container"
            display="flex"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            alignContent="center"
            minWidth="100vw"
            minHeight="100vh"
          >
            <Header />
            <MainContent />
            {/* TODO: Add the copyright(c) Karen Wang*/}
          </Box>
        </CssBaseline>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
