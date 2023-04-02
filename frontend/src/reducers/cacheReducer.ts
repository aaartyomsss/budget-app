const cacheReducer = (state: any = null, action) => {

  switch (action.type) {
    case 'SET':
      return action.data
    case 'CLEAR_CACHE':
      return action.data
    default:
      return state
  }

}

export const setCache = obj => {
  return {
    type: 'SET',
    data: obj
  }
}

export const clearCache = () => {
  return {
    type: 'CLEAR_CACHE',
    data: null
  }
}

export default cacheReducer