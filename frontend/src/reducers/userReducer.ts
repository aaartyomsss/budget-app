

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user
    case 'LOGOUT':
      return action.user
    default:
      return state
  }
}

export const login = user => {
  return {
    type: 'LOGIN',
    user
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
    user: null
  }
}

export default userReducer