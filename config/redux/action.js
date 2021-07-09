import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import store from './store';

export const setDataUser = (data) => async (dispatch) => {
  return dispatch({ type: 'SET_DATA_USER', payload: data });
}