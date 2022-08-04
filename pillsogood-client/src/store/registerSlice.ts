import { configureStore, createSlice } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

interface IResiter {
  nickname: string
  dateOfBirth: string
  phoneNumber: number
}
const initialState: IResiter = {
  nickname: '',
  dateOfBirth: '',
  phoneNumber: 0,
}

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setNickName: (state, action) => {
      state.nickname = action.payload
    },
    setDateOfBirth: (state, action) => {
      state.dateOfBirth = action.payload
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload
    },
  },
})

export const registerActions = { ...registerSlice.actions }
