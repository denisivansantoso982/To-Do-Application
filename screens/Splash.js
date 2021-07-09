import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from '../assets/styles/styles';
import colour from '../models/Colour';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth'

class Splash extends Component {
  componentDidMount() {
    setTimeout(async () => {
      const user = await auth().currentUser;
      console.log(user);
      if (user) {
        this.props.navigation.replace('landing');
      } else {
        this.props.navigation.replace('login');
      }
    }, 2000);
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
  signInUser: (data) => dispatch()
});

export default connect(mapToState, mapToAction)(Splash);