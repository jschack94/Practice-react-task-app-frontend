  export const loginUser = user => {
    return {
        type: 'LOGIN_USER',
        user
    }
}

export const logoutUser = () => {
    return {
        type: 'LOGOUT_USER'
    }
}