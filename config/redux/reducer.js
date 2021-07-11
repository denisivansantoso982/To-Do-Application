const initialState = {
  users: {},
  todo: [],
  allUsers: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA_USER': {
      return {...state, users: action.payload}
    }
    case 'SET_LIST_TODO': {
      return {...state, todo: action.payload}
    }
    case 'SET_ALL_USERS': {
      return {...state, allUsers: action.payload}
    }
  }

  return state;
}

export default reducer;