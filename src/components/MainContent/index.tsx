import { useState } from "react";
import { CopyColor, ImageUploader } from "../../components"
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { colorFormatsEnum } from "../../utils/enums";
import { useDetectDevice } from "../../hooks/useDetectMobile";

function MainContent() {
    // Color related
    const [color, setColor] = useState('');
    // Color format related
    const [colorFormat, setColorFormat] = useState<string>(colorFormatsEnum.hex);
    // RWD related
    const { isMobile } = useDetectDevice()


    /**
     * Handle changing color format
     */
    function handleChange (e: SelectChangeEvent) {
        setColorFormat(e.target.value as string)
    }

    return (
        <Box
            className="cp-main-content-container"
            component="main"
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            alignItems={isMobile ? 'center': 'stretch'}
            justifyContent="center"
            gap={8}
        >
            <ImageUploader color={color} setColor={setColor} />
            <Stack
                className="cp-main-content-right-container"
                justifyContent="center"
                gap={9}
                width={isMobile ? 325 : 269}
            >
                <Box
                    className="cp-main-content-right-color-indicator"
                    sx={{ backgroundColor: color }}
                    border="1px solid var(--border-color)"
                    borderRadius={4}
                    height={64}
                />
                <FormControl fullWidth>
                    <InputLabel
                        htmlFor="corlor-format"
                        sx={{ display: 'none' }}
                    >
                        Color Format
                    </InputLabel>
                    <Select
                        className="cp-main-content-right-color-format-select"
                        value={colorFormat}
                        onChange={handleChange}
                        slotProps={{
                            input: { id: 'corlor-format' }
                        }}
                    >
                        <MenuItem
                            className="cp-main-content-right-color-format-select-hex"
                            value={colorFormatsEnum.hex}
                        >
                            Hex
                        </MenuItem>
                        <MenuItem
                            className="cp-main-content-right-color-format-select-rgb"
                            value={colorFormatsEnum.rgb}
                        >
                            RGB
                        </MenuItem>
                    </Select>
                </FormControl>
                <CopyColor color={color} colorFormat={colorFormat} />
            </Stack>
        </Box>
    );
}

export default MainContent;