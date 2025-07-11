import { useEffect, useState } from "react";
import { ContentCopyRounded } from "@mui/icons-material";
import { Alert, Box, IconButton, Snackbar, TextField } from "@mui/material";
import { colorFormatsEnum } from "../../utils/enums";
import { hexToRgb } from "../../utils/helpers/colorTransfrom";

interface CopyColorProps {
    color: string;
    colorFormat: string;
}

function CopyColor({ color, colorFormat }: CopyColorProps) {
    // Color related
    const [formattedColor, setFormattedColor] = useState(color);
    // Message related
    const [openSuccessCopied, setOpenSuccessCopied] = useState(false);
    const [openFailureCopied, setOpenFailureCopied] = useState(false);

    /**
     * Transform the color formats
     */
    useEffect(() => {
        if(colorFormat === colorFormatsEnum.hex) {
            setFormattedColor(color)
        } else if (colorFormat === colorFormatsEnum.rgb) {
            const { r, g, b} = hexToRgb(color)
            setFormattedColor(`${r}, ${g}, ${b}`)
        } 

    }, [colorFormat, color]);

    /**
     * Handle copying current color
     */
    async function handleCopyColor(color: string) {
        try {
            await navigator.clipboard.writeText(color);
            console.log(`Copied to clipboard: ${color}`);
            setOpenSuccessCopied(true)
        } catch (err) {
            console.error('Clipboard write failed:', err);
            setOpenFailureCopied(true)
        }
    }

    return (
        <>
            <Box
                className="cp-copy-color-container"
                sx={{
                    border: '1px solid #FFFFFF',
                    borderRadius: 4,
                }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <TextField
                    className="cp-copy-color-input"
                    id="copy-color"
                    variant="outlined"
                    value={formattedColor}
                    sx={{
                        '& .MuiInputBase-root': { border: 'none' },
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                />
                <IconButton
                    className="cp-copy-color-button"
                    onClick={() => handleCopyColor(formattedColor)}
                >
                    <ContentCopyRounded />
                </IconButton>
            </Box>
            { openSuccessCopied &&
                <Snackbar
                    className="cp-copy-color-snackbar-success"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={openSuccessCopied}
                    onClose={() => setOpenSuccessCopied(false)}
                    // autoHideDuration={3000}
                >
                    <Alert
                        className="cp-copy-color-alert-success"
                        onClose={() => setOpenSuccessCopied(false)}
                        severity="success"
                        variant="filled"
                        color="success"
                    >
                        Copied
                    </Alert>
                </Snackbar>
            }
            { openFailureCopied &&
                <Snackbar
                    className="cp-copy-color-snackbar-failure"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={openFailureCopied}
                    onClose={() => setOpenFailureCopied(false)}
                    autoHideDuration={3000}
                >
                    <Alert
                        className="cp-copy-color-alert-failure"
                        onClose={() => setOpenFailureCopied(false)}
                        severity="error"
                        variant="filled"
                    >
                        Failed to copy the color. Please try again.
                    </Alert>
                </Snackbar>
            }
        </>
    );
}

export default CopyColor;