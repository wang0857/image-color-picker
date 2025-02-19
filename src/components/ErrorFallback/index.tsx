import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
    buttonLabel: string;
    fallbackHandler: () => void;
}

function ErrorFallback({ error, resetErrorBoundary, buttonLabel, fallbackHandler }: ErrorFallbackProps) {
    return (
        <Box>
            <Typography variant="h1">
                Oops! Something went wrong.
            </Typography>
            <Typography variant="body1">
                Error message is:
            </Typography>
            <Typography variant="subtitle1">
                { error.message }
            </Typography>

            <Button
                startIcon={<ArrowBack />}
                onClick={() => {
                    resetErrorBoundary()
                    fallbackHandler()
                }}
            >
                { buttonLabel }
            </Button>
        </Box>
    );
}

export default ErrorFallback;