import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    usersSet: (state, action) => {
      return action.payload
    },
  },
})

export const { usersSet } = userSlice.actions
export default userSlice.reducer

export const setUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    console.log("sdadasdadasdqadasdasd")
    console.log(users)
    dispatch(usersSet(users))
  }
}
