  export const loginUser = user => {
    return {
        type: 'LOGIN_USER',
        user
    }
}

xport const logoutUser = () => {
    return {
        type: 'LOGOUT_USER'
    }
}