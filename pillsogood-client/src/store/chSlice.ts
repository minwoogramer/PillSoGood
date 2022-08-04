import { applyMiddleware } from 'redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'

interface IDCH {
  ch: string
}
const initialState: IDCH = {
  ch: '',
}

export const chSlice = createSlice({
  name: 'characterId',
  initialState,
  reducers: {
    setCh: (state, action) => {
      state.ch = action.payload
    },
  },
})

export const chActions = { ...chSlice.actions }
