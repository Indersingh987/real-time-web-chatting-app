import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedScreen:{
        // chat:true,
        // requests:false,
        // friends:false
    }
}

const screenSlice = createSlice({
    name: 'screen',
    initialState,
    reducers: {
        setScreen:(state,actions)=>{
            // state.selectedScreen.chat = actions.payload.chat
            // state.selectedScreen.requests = actions.payload.requests
            // state.selectedScreen.friends = actions.payload.friends
            state.selectedScreen  =  actions.payload
        }
    }
});

export const { setScreen } = screenSlice.actions
export const selectScreen = (state) => state.screen.selectedScreen

export default screenSlice.reducer