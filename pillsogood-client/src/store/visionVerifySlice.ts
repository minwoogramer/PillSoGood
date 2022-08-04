import { configureStore, createSlice } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

interface IResiter {
  verify: boolean
}
const initialState: IResiter = {
  verify: false,
}

export const verifySlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {
    setVerify: (state, action) => {
      state.verify = action.payload
    },
  },
})

export const verifyActions = { ...verifySlice.actions }
