import Cookies from "js-cookie";

const TOKEN_KEY = "token"
const USER_KEY = "user"

export const getAccessToken = () => {
    const accessToken = Cookies.get(TOKEN_KEY);
    return accessToken || null;
}

export const getUserFromStorage = () => {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
}

export const saveTokenToStorage = (data) => {
    Cookies.set(TOKEN_KEY, data.accessToken)
}

export const removeTokenFromStorage = () => {
    Cookies.remove(TOKEN_KEY)
}

export const saveUserToStorage = (data) => {
    localStorage.setItem(USER_KEY, JSON.stringify(data))
}

export const removeUserFromStorage = () => {
    localStorage.removeItem(USER_KEY)
}