import { useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useColorTransform } from "../../hooks/useColorTransform";
import { useDetectDevice } from "../../hooks/useDetectMobile";

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
    // RWD related
    const { isMobile } = useDetectDevice()
    

    /**
     * Draw Image
     */
    useEffect(() => {
        if (!src || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
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

            // Set initial position in the center of image
            const halfWidth = Math.floor(img.width / 2);
            const halfHeight = Math.floor(img.height / 2);
            const scaleX = canvas.width / canvas.clientWidth
            const scaleY = canvas.height / canvas.clientHeight
            const clampedX = Math.floor(halfWidth / scaleX)
            const clampedY = Math.floor(halfHeight / scaleY)
            
            // Move the dot
            positionRef.current = { x: clampedX, y: clampedY }
            const { x, y } = positionRef.current
            if (eyedropperRef.current) {
                eyedropperRef.current.style.left = `${x}px`;
                eyedropperRef.current.style.top = `${y}px`;
            }
            
            // Get color's data
            const pixel = ctx.getImageData(x * scaleX, y * scaleY, 1, 1);
            const data = pixel.data;
    
            const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
            const hex = useColorTransform('rgba', 'hex', rgba)
    
            setColor(hex)
        };
    }, [src]);

    /**
     * Handle picking colors when hovering on the canvas
     */
    function handleMouseMoveOnCanvas(event: React.MouseEvent<HTMLCanvasElement>) {
        if(isDragging) {
            // Canvas
            const canvas = canvasRef.current!;
            const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
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
     * Handle touch move on mobile.
     */
    function handleTouchMoveOnCanvas(event: TouchEvent) {
        event.preventDefault()
        // TODO: Fix the browser scrolling while dragging the eyedropper
        if (isDragging) {
            const canvas = canvasRef.current!;
            const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
            const bounding = canvas.getBoundingClientRect();

            // Use the first touch point
            const touch = event.touches[0];
            const x = touch.clientX - bounding.left;
            const y = touch.clientY - bounding.top;
            const r = CIRCLE_SIZE / 2;

            const clampedX = Math.min(Math.max(x, r), canvas.clientWidth - r);
            const clampedY = Math.min(Math.max(y, r), canvas.clientHeight - r);

            // Move the dot
            positionRef.current = { x: clampedX, y: clampedY };
            if (eyedropperRef.current) {
                eyedropperRef.current.style.left = `${clampedX}px`;
                eyedropperRef.current.style.top = `${clampedY}px`;
            }

            // Get color data
            const scaleX = canvas.width / canvas.clientWidth;
            const scaleY = canvas.height / canvas.clientHeight;
            const pixel = ctx.getImageData(x * scaleX, y * scaleY, 1, 1);
            const data = pixel.data;

            const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
            const hex = useColorTransform("rgba", "hex", rgba);

            setColor(hex);
        }
    }

    /**
     * Handle keys down events on the Canvas or dot
     */
    function handleKeyDownOnCanvasDot(event: React.KeyboardEvent) {
        const MOVE_STEP = 5;

        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
        const r = CIRCLE_SIZE / 2;
        const canvasWidth = canvas.clientWidth;
        const canvasHeight = canvas.clientHeight;

        let { x, y } = positionRef.current;

        switch (event.key) {
            case 'ArrowUp':
                y = Math.max(y - MOVE_STEP, r);
                break;
            case 'ArrowDown':
                y = Math.min(y + MOVE_STEP, canvasHeight - r);
                break;
            case 'ArrowLeft':
                x = Math.max(x - MOVE_STEP, r);
                break;
            case 'ArrowRight':
                x = Math.min(x + MOVE_STEP, canvasWidth - r);
                break;
            case 'Tab':
                eyedropperRef.current?.focus()
                break
            case 'Escape':
                eyedropperRef.current?.blur()
                break
            default:
                return;
        }

        positionRef.current = { x, y };

        if (eyedropperRef.current) {
            eyedropperRef.current.style.left = `${x}px`;
            eyedropperRef.current.style.top = `${y}px`;
        }

        const scaleX = canvas.width / canvas.clientWidth;
        const scaleY = canvas.height / canvas.clientHeight;
        const pixel = ctx.getImageData(x * scaleX, y * scaleY, 1, 1);
        const data = pixel.data;

        const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
        const hex = useColorTransform('rgba', 'hex', rgba);

        setColor(hex);
    }

    /**
     * Listening the mouse move, up, down event to decide the state of `isDragging`
     */
    useEffect(() => {
        eyedropperRef.current?.focus()
        
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

        const handleTouchStart = (e: TouchEvent) => {
            isMouseDown.current = true;

            // Check if mousedown happened inside the container
            if (containerRef.current?.contains(e.target as Node)) {
                setIsDragging(true);
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            isMouseDown.current = false;
            setIsDragging(false); // Always stop dragging on mouseup
        };

        const handleTouchMove = (e: TouchEvent) => {
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

        if(isMobile) {
            window.addEventListener('touchstart', handleTouchStart)
            window.addEventListener('touchend', handleTouchEnd)
            window.addEventListener('touchmove', handleTouchMove)
        }

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    /**
     * Handle the touch move events on Canvas and Eyedropper
     */
    useEffect(() => {
        // DOMs
        const canvas = canvasRef.current;
        const eyedropper = eyedropperRef.current;

        if (!canvas || !eyedropper) return;

        if(isMobile) {
            canvas.addEventListener('touchmove', handleTouchMoveOnCanvas, { passive: false })
            eyedropper.addEventListener('touchmove', handleTouchMoveOnCanvas, { passive: false })
        }

        return () => {
            canvas.removeEventListener ('touchmove', handleTouchMoveOnCanvas)
            eyedropper.removeEventListener ('touchmove', handleTouchMoveOnCanvas)
        }
    }, [canvasRef.current, eyedropperRef.current]);

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
                // onTouchMove={handleTouchMoveOnCanvas}
                onKeyDown={handleKeyDownOnCanvasDot}
                tabIndex={0}
                aria-label="Color picker canvas"
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
                onTouchStart={() => setIsDragging(true)}
                // onTouchMove={handleTouchMoveOnCanvas}
                onTouchEnd={() => setIsDragging(false)}
                onKeyDown={handleKeyDownOnCanvasDot}
                onFocus={() => setIsDragging(true)}
                onBlur={() => setIsDragging(false)}
                tabIndex={0}
                aria-label="Color picker eyedropper"
            />
        </Box>
    );
}

export default ImageColorPicker;