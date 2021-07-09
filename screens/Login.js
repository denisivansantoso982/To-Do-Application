import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from '../assets/styles/styles';
import colour from '../models/Colour';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { setDataUser } from '../config/redux/action';

class Login extends Component {
  constructor () {
    super();
    this.state = {
      phoneNumber: '',
      loading: false
    }
  }

  async doCheckUser() {
    try {
      var phone = this.state.phoneNumber.replace(/0/, '+62');
      if (this.validation()) {
        await firestore().collection('users').where('phoneNumber', '==', phone).get().then(user => {
          console.log(user);
          if (user.empty) {
            Alert.alert('Information', 'Account not found! Please do register!');
            this.setState({ loading: false });
          } else {
            this.doLogin(phone);
          }
        });
      }
    } catch (error) {
      Alert.alert(error.code, error.message);
      console.log(error.code, error.message);
      this.setState({loading: false});
    }
  }

  async doLogin(phone) {
    try {
      await auth().signInWithPhoneNumber(phone).then(async () => {
        const user = auth().currentUser;
        if (user) {
          const token = await messaging().getToken();
          await firestore().collection('users').doc(user.uid).update({ token: token });
          await firestore().collection('users').doc(user.uid).get().then(snapshot => {
            const data = {id: snapshot.id, ...snapshot.data()};
            this.props.signInUser(data);
          });
          this.props.navigation.replace("landing");
        } else {
          Alert.alert('Information', 'Timeout');
          this.setState({ loading: false });
          return;
        }
      });
    } catch (error) {
      Alert.alert(error.code, error.message);
      console.log(error.code, error.message);
      this.setState({loading: false});
    }
  }

  validation() {
    if (this.state.phoneNumber === '') {
      Alert.alert('Warning', 'Phone number is required for login!');
      return false;
    }

    return true;
  }

  render() {
    console.log(auth().currentUser);
    const { phoneNumber, loading } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView scrollEnabled={true} style={{ flex: 1, ...styles.scrollInput }}>

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
            <TouchableOpacity onPress={() => this.doCheckUser()} activeOpacity={0.9} style={styles.button}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

            <View style={{...styles.askingContainer, marginTop: 50}}>
              <Text style={styles.askingAccount}>Do not have an account? </Text>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.push('register')}>
                <Text style={styles.loginOrRegister}>Register</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <Modal statusBarTranslucent={true} transparent={true} animationType="fade" onRequestClose={() => this.setState({ loading: !loading })} visible={loading}>
            <View style={styles.modalDatePicker}>
              <ActivityIndicator animating={true} color={colour.primary} size='large' />
            </View>
          </Modal>

        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapToState = state => ({
  users: state.users
});

const mapToAction = dispatch => ({
  signInUser: (data) => dispatch(setDataUser(data))
});

export default connect(mapToState, mapToAction)(Login);