import { Box, Button, Stack, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setDataUrl } from "../../store/imageSlice";
import { ImageColorPicker } from "../../components"

interface ImageUploaderProps {
    color: string;
    setColor: (color: string) => void;
}

function ImageUploader({ color, setColor }: ImageUploaderProps) {
    const image = useAppSelector(state => state.image)
    const dispatch = useAppDispatch()
    /**
     * File handler after dropping files to the dropzone
     */
    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                const dataUrl = reader.result as string; // Base64 image string

                // Dispatch the image data Url to update image state
                dispatch(setDataUrl(dataUrl))
            };

            // Read file as Base64
            reader.readAsDataURL(file);
        });
    };

    // react-dropzone related
    const {
        getRootProps, getInputProps, isDragActive,
        isDragReject, open,
    } = useDropzone({
        onDrop, // Function to define the handler on dropping files
        noClick: true,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
        },
    })

    
    return (
        <Box
            className="cp-image-uploader-container"
            borderRadius={4}
            border={`
                ${isDragActive ? 4 : 1}px
                dashed
                var(${isDragActive ? 
                    isDragReject ? '--border-error' : '--border-success' :
                    '--border-color'
                })
            `}
            width={410}
            height={421}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap={4}
            sx={{
                objectFit: 'contain',
                overflow: 'hidden'
            }}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            { image.dataUrl === '' ?
                // UI for no image uploaded
                isDragReject ?
                <Stack
                    className="cp-image-uploader-wordings-error"
                    alignItems="center"
                >
                    <Typography color="error">
                        This type of uploaded image is not allowed.
                    </Typography>
                    <Typography color="error">
                        Please use jpg or png format.
                    </Typography>
                </Stack> :
                <>
                    <Stack
                        className="cp-image-uploader-wordings"
                        alignItems="center"
                    >
                        <Typography>
                            Upload or Drop Your Image Here.
                        </Typography>
                        <Typography>
                            Please use jpg or png format.
                        </Typography>
                    </Stack>
                    <Button
                        className="cp-image-uploader-button"
                        variant="contained"
                        color="primary"
                        onClick={open}
                    >
                        Upload
                    </Button>
                </> :
                // UI for uploaded image
                <ImageColorPicker
                    src={image.dataUrl}
                    color={color}
                    setColor={setColor}
                />
            }
        </Box>
    );
}

export default ImageUploader;