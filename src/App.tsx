import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from "./components"
import { Button, CssBaseline, ThemeProvider } from "@mui/material"
import { customDarkTheme, customLightTheme } from "./themes";

function App() {
  const [isDark, _setIsDark] = useState(false);

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
          {/* TODO: The main component */}
          <Button variant="contained" color="primary">
            Test
          </Button>
        </CssBaseline>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
