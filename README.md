# Color Image Picker

This is my side project for picking colors from a temporarily uploaded image.

## Where I got Inspired

When learning the canvas from MDN, I found the canvas having many handy features.
One of them is [Pixel manipulation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas) where you can get the pixel's data like x y coordination and its color codes such as RGBA.

## What tools I will use

- Vite
- React
- TypeScript
- Redux
- MUI, the UI library for customizing the component via its design system
- React Error Boundary, catching any error and display it gracefully on the UI.
- Cypress, for the E2E test (TBD)
- Vitest, for unit test (TBD)

## Current Progress

- [v] Set up the app using Vite.
- [v] Set up the Redux store.
- [v] Set up the Error Boundary.
- [v] Set up the Custom Design System in MUI.
- [] Develop the Image uploader.
- [] Develop the Image Canvas.
- [] Develop the Color Inputs displaying the color information.
- [] Develop the function of converting RGB to Hex codes.
- [] Develop the function of copying the value from the color input field.
- [] Develop the unit test for the functions of vonverting colors and copying values.
- [] Develop the E2E test for the UI.

## Prototypes in Figma

[https://www.figma.com/proto/cX24YdWm99AOozlygN1IUN/ColorPicker?node-id=21-392&t=u6XPW9JTRQM5XlKp-1&scaling=min-zoom&content-scaling=fixed&page-id=5%3A272](https://www.figma.com/proto/cX24YdWm99AOozlygN1IUN/ColorPicker?node-id=21-392&t=u6XPW9JTRQM5XlKp-1&scaling=min-zoom&content-scaling=fixed&page-id=5%3A272)