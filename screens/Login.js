import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import styles from '../assets/styles/styles';
import colour from '../models/Colour';

class Login extends Component {
  constructor () {
    super();
    this.state = {
      phoneNumber: ''
    }
  }

  doLogin = () => {
    this.props.navigation.replace("landing");
  }

  render() {
    const { phoneNumber } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView scrollEnabled={true} style={{ flex: 1, ...styles.scrollInput}}>
          <View style={styles.titleContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.titleText}>TO</Text>
              <Text style={{...styles.titleText, color: colour.primary}}>DO</Text>
            </View>
            <Text style={styles.subTitleText}>Login To Access The App</Text>

            <View style={{...styles.cardInput, marginTop: 50}}>
              <Text style={styles.inputTextField}>Phone Number</Text>
              <TextInput style={styles.inputField} placeholder="08xxxxxxxxxx" keyboardType="phone-pad" onChange={(e) => this.setState({phoneNumber: e.nativeEvent.text})} defaultValue={phoneNumber} />
            </View>
            <Text style={styles.notice}>SMS Code auto verify!</Text>
            <TouchableOpacity onPress={() => this.doLogin()} activeOpacity={0.9} style={styles.button}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

            <View style={{...styles.askingContainer, marginTop: 50}}>
              <Text style={styles.askingAccount}>Do not have an account? </Text>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.push('register')}>
                <Text style={styles.loginOrRegister}>Register</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapToState = state => ({
  users: state.users
});

const mapToAction = dispatch => ({
  signInUser: (data) => dispatch()
});

export default connect(mapToState, mapToAction)(Login);