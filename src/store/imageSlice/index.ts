import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define a type for the slice state
interface ImageState {
    dataUrl: string;
}
  
// Define the initial state using that type
const initialState: ImageState = {
    dataUrl: ''
}

export const imageSlice = createSlice({
    name: 'image',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setDataUrl: (state, action: PayloadAction<string>) => {
            state.dataUrl = action.payload
        }
    }
})
  
export const { setDataUrl } = imageSlice.actions
export default imageSlice.reducer