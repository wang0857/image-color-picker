import { useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useColorTransform } from "../../hooks/useColorTransform";

interface ImageColorPickerProps {
    src: string;
    color: string;
    setColor: (color: string) => void;
}

function ImageColorPicker({ src, color, setColor }: ImageColorPickerProps) {
    // Canvas relates
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    // Image relates
    const imageRef = useRef<HTMLImageElement | null>(null);
    // Custom eyedropper related
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // Drag dot related
    const [isDragging, setIsDragging] = useState(false);
    

    /**
     * Draw Image
     */
    useEffect(() => {
        if (!src || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.src = src;
        img.alt = "Uploaded image"

        img.onload = () => {
            // TODO: Haven't fix it. To be continued
            const imageDom = imageRef.current!
            canvas.width = imageDom.width;
            canvas.height = imageDom.height;
            // const imageDom = document.querySelector('.cp-image-color-picker-image-hidden') as HTMLImageElement
            ctx.drawImage(
                img,                    // source
                0, 0,                   // draw starting at top-left corner of canvas
                // img.width,   // Scale to current image width 
                // img. height  // Scale to current image height
            );
        };
    }, [src]);

    /**
     * Handle picking colors when hovering on the canvas
     */
    function handleMouseMoveOnCanvas(event: React.MouseEvent<HTMLCanvasElement>) {
        if(isDragging) {
            const canvas = canvasRef.current!;
            const ctx = canvas.getContext('2d')!;
    
            const bounding = canvas.getBoundingClientRect();
            const x = event.clientX - bounding.left;
            const y = event.clientY - bounding.top;
            const pixel = ctx.getImageData(x, y, 1, 1);
            const data = pixel.data;
    
            const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
            const hex = useColorTransform('rgba', 'hex', rgba)
    
            setColor(hex)
        }
    }
    

    return (
        <Box
            className="cp-image-color-picker-container"
            position="relative"
        >
            <canvas
                ref={canvasRef}
                className="cp-image-color-picker-image"
                style={{ width: '100%', height: '100%' }}
                onMouseMove={handleMouseMoveOnCanvas}
            />
            <img
                className="cp-image-color-picker-image-hidden"
                ref={imageRef}
                style={{
                    width: '100%',
                    height: '100%',
                    visibility: 'hidden', // ✅ Keeps layout but hides visually
                    position: 'absolute', // ✅ Optional: ensure it doesn't shift layout
                    top: 0,
                    left: 0
                }}
                src={src}
            />
            <div
                className="cp-image-color-picker-eyedropper"
                style={{
                    position: 'absolute',
                    top: position.y,
                    left: position.x,
                    backgroundColor: color,
                    width: 25,
                    height: 25,
                    border: '1px solid #fff',
                    boxShadow: '0 0 0 2px #000',
                    borderRadius: '50%',
                    cursor: 'pointer'
                }}
                role="button"
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
            />
        </Box>
    );
}

export default ImageColorPicker;