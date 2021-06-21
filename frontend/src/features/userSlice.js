import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const checkLogin = createAsyncThunk(
    'users/login',
    async (formData) => {
        const { data } = await axios({
            method:'post',
            url:'http://localhost:5000/api/users/login',
            data:formData
        })
        sessionStorage.setItem('user',JSON.stringify(data))
      return data
    }
)

const searchUser = createAsyncThunk(
  'users/search',
  async (searchData) => {
      const { data } = await axios({
          method:'post',
          url:'http://localhost:5000/api/users/search',
          data:searchData
      })
    return data
  }
)


const initialState = {
    user:{
    },
    search:{
    },
}

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers:{
        getUser:(state,action)=>{
             return state
        }
    },
    extraReducers: {
        
        [checkLogin.fulfilled]: (state, action) => {
          state.user = JSON.parse(sessionStorage.getItem('user'))
        },
        [searchUser.fulfilled]: (state, action) => {
          
          state.search = action.payload
        },
    },
});

export const { getUser } = userSlice.actions
export const userData = (state) => state.User.user
export const searchData = (state) => state.User.search
export { checkLogin,searchUser }
export default userSlice.reducer

