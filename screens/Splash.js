import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from '../assets/styles/styles';
import colour from '../models/Colour';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { setDataUser } from '../config/redux/action';

class Splash extends Component {
  componentDidMount() {
    setTimeout(async () => {
      const user = auth().currentUser;
      console.log(user);
      if (user) {
        await firestore().collection('users').doc(user.uid).get().then(userData => {
          const data = { id: userData.id, ...userData.data() };
          this.props.signInUser(data);
        });
        this.props.navigation.replace('landing');
      } else {
        this.props.navigation.replace('login');
      }
    }, 1500);
  }

  render() {
    return (
      <View style={{ ...styles.container, flexDirection: 'column' }}>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{...styles.titleText, fontSize: 48}}>TO</Text>
          <Text style={{...styles.titleText, color: colour.primary, fontSize: 48}}>DO</Text>
        </View>
        <Text style={styles.titleApp}>APPLICATION</Text>

      </View>
    );
  }
}


const mapToState = state => ({
  users: state.users
});

const mapToAction = dispatch => ({
  signInUser: (data) => dispatch(setDataUser(data))
});

export default connect(mapToState, mapToAction)(Splash);