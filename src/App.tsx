import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from "./components"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { customDarkTheme, customLightTheme } from "./themes";

function App() {
  const [isDark, setIsDark] = useState(false);

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
        <CssBaseline />

      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
