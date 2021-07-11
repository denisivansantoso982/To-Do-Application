import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from '../assets/styles/styles';
import colour from '../models/Colour';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging';
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
      <View style={{ ...styles.container, backgroundColor: colour.primary, flexDirection: 'column' }}>

        <FontAwesome name="list-alt" color="#FFF" size={140} />
        <Text style={styles.titleApp}>TODO APPLICATION</Text>

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