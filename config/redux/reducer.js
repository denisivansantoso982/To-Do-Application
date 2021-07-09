const initialState = {
  users: {},
  todo: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA_USER': {
      return {...state, users: action.payload}
    }
  }

  return state;
}

export default reducer;