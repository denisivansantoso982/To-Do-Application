export const setDataUser = (data) => (dispatch) => {
  return dispatch({ type: 'SET_DATA_USER', payload: data });
}

export const setListTodo = (data) => (dispatch) => {
  return dispatch({ type: 'SET_LIST_TODO', payload: data });
}

export const setAllUsers = (data) => (dispatch) => {
  return dispatch({ type: 'SET_ALL_USERS', payload: data });
}