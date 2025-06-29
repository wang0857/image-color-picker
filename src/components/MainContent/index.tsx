import { useEffect, useState } from "react";
import { ImageUploader } from "../../components"
import { Box, Stack } from "@mui/material";

function MainContent() {
    // Color related
    const [color, setColor] = useState('');

    /**
     * TODO: To be removed after testing.
     */
    useEffect(() => {
        console.log('Color: ', color)
    }, [color]);


    return (
        <main className="cp-main-content-container">
            <ImageUploader color={color} setColor={setColor} />
            <Stack
                className="cp-main-content-right-container"
                justifyContent="space-between"
                width={269}
            >
                <Box
                    className="cp-main-content-right-color-indicator"
                    sx={{ backgroundColor: color }}
                    border="1px solid var(--border-color)"
                    borderRadius={2}
                    height={64}
                />
            </Stack>
        </main>
    );
}

export default MainContent;