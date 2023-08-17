import { loginFailure, loginStart, loginSuccess } from "./adminRedux"
import axios from "axios";

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        console.log("AAAAAAAAA gyya")
        console.log(user)
        const res = await axios.post("https://lazy-ruby-goldfish-gown.cyclic.cloud/api/auth/login", user)
        console.log("data")
        console.log(res.data)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}