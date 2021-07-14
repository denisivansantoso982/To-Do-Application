import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, Modal, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import styles from '../assets/styles/styles';
import colour from '../models/Colour';
import DateTimePicker from 'react-native-date-picker';
import FeatherIcon from 'react-native-vector-icons/Feather'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { setDataUser } from '../config/redux/action';

class Register extends Component {
  constructor () {
    super();
    this.state = {
      name: '',
      dateOfBirth: new Date(Date.now()),
      phoneNumber: '',
      address: '',
      showDatePicker: false,
      loading: false
    }
  }

  async componentDidMount() {
    console.log(await messaging().getToken())
  }

  doProcessRegister = async () => {
    const { phoneNumber, loading } = this.state;
    this.setState({loading: true});
    var phones = phoneNumber.replace(/0/, '+62');
    try {
      if (this.validation()) {
        await firestore().collection('users').where('phoneNumber', '==', phones).get().then(async (checkUser) => {
          if (!checkUser.empty) {
            this.setState({loading: false});
            Alert.alert('Information', 'You already have an account!');
          } else {
            this.doRegister(phones);
          }
        });
      }
    } catch (error) {
      Alert.alert(error.code, error.message);
      console.log(error.code, error.message);
      this.setState({loading: false});
    }
  }

  doRegister = async (phones) => {
    const { name, dateOfBirth, phoneNumber, address, loading } = this.state;
    await auth().signInWithPhoneNumber(phones).then(async () => {
      await auth().onAuthStateChanged(async users => {
        console.log(await users);
        if (users) {
          const token = await messaging().getToken();
          const uid = await users.uid;
          console.log(token + ' - ' + uid)
          console.log(uid);
          await firestore().collection('users').doc(uid).set({
            name: name,
            dateOfBirth: dateOfBirth.toDateString(),
            phoneNumber: phones,
            avatar: '',
            address: address,
            role: 'Employee',
            token: token
          }).then(async () => {
            await firestore().collection('users').doc(uid).get().then(user => {
              const data = { id: user.id, ...user.data() };
              this.props.signInUser(data);
              this.props.navigation.replace('landing');
            }).catch(error => {
              Alert.alert(error.code, error.message);
              console.log(error.code, error.message);
              this.setState({loading: false});
            });
          }).catch((error) => {
            Alert.alert(error.code, error.message);
            console.log(error.code, error.message);
            this.setState({loading: false});
          });
        }
      });
    }).catch((error) => {
      Alert.alert(error.code, error.message);
      console.log(error.code, error.message);
      this.setState({loading: false});
    });
  }

  validation() {
    const { name, dateOfBirth, phoneNumber, address } = this.state;

    if (name === '') {
      Alert.alert("Warning", "Name must be fill!");
      return false;
    } else if (dateOfBirth === '') {
      Alert.alert("Warning", "Date Of Birth must be fill!");
      return false;
    } else if (phoneNumber === '') {
      Alert.alert("Warning", "Phone Number must be fill!");
      return false;
    } else if (address === '') {
      Alert.alert("Warning", "Address must be fill!");
      return false;
    }

    return true;
  }

  render() {
    const { name, dateOfBirth, phoneNumber, address, showDatePicker, loading } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView scrollEnabled={true} style={{
          flex: 1, ...styles.scrollInput
        }}>

          <SafeAreaView style={styles.titleContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.titleText}>TO</Text>
              <Text style={{...styles.titleText, color: colour.primary}}>DO</Text>
            </View>
            <Text style={styles.subTitleText}>Register To Make an Account</Text>

            <View style={styles.cardInput}>
              {/* Name  */}
              <Text style={styles.inputTextField}>Name</Text>
              <TextInput style={styles.inputField} placeholder="Your Name" keyboardType="default" onChange={(e) => this.setState({name: e.nativeEvent.text})} defaultValue={name} />

              {/* dateOfBirth */}
              <Text style={styles.inputTextField}>Date of Birth</Text>
              <TextInput style={styles.inputField} onFocus={() => { Keyboard.dismiss(); this.setState({ showDatePicker: true }); }} defaultValue={dateOfBirth.toDateString()} />

              {/* phoneNumber */}
              <Text style={styles.inputTextField}>Phone Number</Text>
              <TextInput maxLength={15} style={styles.inputField} placeholder="08xxxxxxxxxx" keyboardType="phone-pad" onChange={(e) => this.setState({phoneNumber: e.nativeEvent.text})} defaultValue={phoneNumber} />

              {/* Address */}
              <Text style={styles.inputTextField}>Address</Text>
              <TextInput style={styles.inputField} multiline={true} placeholder="Your Address" keyboardType="default" onChange={(e) => this.setState({address: e.nativeEvent.text})} defaultValue={address} />
            </View>

            {/* Button */}
            <Text style={styles.notice}>Auto Login To This App and Registered as Employee!</Text>
            <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={this.doProcessRegister}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>

            <View style={styles.askingContainer}>
              <Text style={styles.askingAccount}>Already have an account? </Text>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.loginOrRegister}>Login</Text>
              </TouchableWithoutFeedback>
            </View>
          </SafeAreaView>

          <Modal statusBarTranslucent={true} transparent={true} animationType="slide" onRequestClose={() => this.setState({ showDatePicker: !showDatePicker })} visible={showDatePicker}>
            <View style={styles.modalDatePicker}>
              <TouchableOpacity style={styles.closeModal} onPress={() => this.setState({showDatePicker: false})}>
                <FeatherIcon name="x" color="#FFF" size={24} />
              </TouchableOpacity>
              <Text style={styles.titleModal}>Date Of Birth</Text>
              <View style={styles.dateField}>
                <DateTimePicker textColor="#FFF" date={dateOfBirth} onDateChange={(e) => this.setState({ dateOfBirth: e })} mode="date" androidVariant="nativeAndroid" minimumDate={new Date('1900-01-01')} maximumDate={new Date(Date.now())} />
              </View>
            </View>
          </Modal>

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

export default connect(mapToState, mapToAction)(Register);