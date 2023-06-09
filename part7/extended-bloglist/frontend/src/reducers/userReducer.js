import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    userSet: (state, action) => {
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(action.payload)
      )
      return action.payload
    },
    userLogout: () => {
      return null
    },
  },
})

export const { userSet, userLogout } = userSlice.actions
export default userSlice.reducer

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(userSet(user))
  }
}

export const setLogout = () => {
  return async (dispatch) => {
    dispatch(userLogout())
  }
}
