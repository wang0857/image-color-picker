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
    // Custom eyedropper related
    const positionRef = useRef({ x: 0, y: 0 });
    const eyedropperRef = useRef<HTMLDivElement>(null);
    const CIRCLE_SIZE = 26
    // Drag dot related
    const [isDragging, setIsDragging] = useState(false);
    // Detect the mouse move related
    const isMouseDown = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    

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
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(
                img,    // source
                0, 0,   // draw starting at top-left corner of canvas
            );
        };
    }, [src]);

    /**
     * Handle picking colors when hovering on the canvas
     */
    function handleMouseMoveOnCanvas(event: React.MouseEvent<HTMLCanvasElement>) {
        if(isDragging) {
            // Canvas
            const canvas = canvasRef.current!;
            const ctx = canvas.getContext('2d')!;
            const bounding = canvas.getBoundingClientRect();

            // Get the position
            const x = event.clientX - bounding.left;
            const y = event.clientY - bounding.top;
            const r = CIRCLE_SIZE / 2
            const clampedX = Math.min(Math.max(x, r), canvas.clientWidth - r);
            const clampedY = Math.min(Math.max(y, r), canvas.clientHeight - r);
            
            // Move the dot
            positionRef.current = { x: clampedX, y: clampedY };
            if (eyedropperRef.current) {
                eyedropperRef.current.style.left = `${clampedX}px`;
                eyedropperRef.current.style.top = `${clampedY}px`;
            }
            
            // Get color's data
            const scaleX = canvas.width / canvas.clientWidth
            const scaleY = canvas.height / canvas.clientHeight
            const pixel = ctx.getImageData(x * scaleX, y * scaleY, 1, 1);
            const data = pixel.data;
    
            const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
            const hex = useColorTransform('rgba', 'hex', rgba)
    
            setColor(hex)
        }
    }

    /**
     * Listening the mouse move, up, down event to decide the state of `isDragging`
     */
    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
        isMouseDown.current = true;

        // Check if mousedown happened inside the container
        if (containerRef.current?.contains(e.target as Node)) {
            setIsDragging(true);
        }
        };

        const handleMouseUp = () => {
        isMouseDown.current = false;
        setIsDragging(false); // Always stop dragging on mouseup
        };

        const handleMouseMove = (e: MouseEvent) => {
        const isInside =
            containerRef.current?.contains(e.target as Node) ?? false;

        if (isMouseDown.current && isInside) {
            setIsDragging(true); // Re-entered while still holding mouse
        } else if (!isMouseDown.current || !isInside) {
            setIsDragging(false);
        }
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    

    return (
        <Box
            ref={containerRef}
            className="cp-image-color-picker-container"
            position="relative"
        >
            <canvas
                ref={canvasRef}
                className="cp-image-color-picker-image"
                style={{ width: '100%', height: '100%' }}
                onMouseMove={handleMouseMoveOnCanvas}
            />
            <div
                ref={eyedropperRef}
                className="cp-image-color-picker-eyedropper"
                style={{
                    position: 'absolute',
                    backgroundColor: color,
                    width: 25,
                    height: 25,
                    border: '1px solid #fff',
                    boxShadow: '0 0 0 2px #000',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transform: 'translate(-50%, -50%)'
                }}
                role="button"
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
            />
        </Box>
    );
}

export default ImageColorPicker;