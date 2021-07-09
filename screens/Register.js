import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { connect } from 'react-redux';
import styles from '../assets/styles/styles';
import colour from '../models/Colour';
import DateTimePicker from 'react-native-date-picker';
import FeatherIcon from 'react-native-vector-icons/Feather'

class Register extends Component {
  constructor () {
    super();
    this.state = {
      name: '',
      dateOfBirth: new Date(Date.now()),
      phoneNumber: '',
      address: '',
      showDatePicker: false
    }
  }

  render() {
    const { name, dateOfBirth, phoneNumber, address, showDatePicker } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView scrollEnabled={true} style={{
          flex: 1, ...styles.scrollInput}}>
          <View style={styles.titleContainer}>
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
            <TouchableOpacity activeOpacity={0.9} style={styles.button}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>

            <View style={styles.askingContainer}>
              <Text style={styles.askingAccount}>Already have an account? </Text>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.loginOrRegister}>Login</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <Modal statusBarTranslucent={true} transparent={true} animationType="slide" onRequestClose={() => this.setState({ showDatePicker: !showDatePicker })} visible={showDatePicker}>
            <View style={styles.modalDatePicker}>
              <TouchableOpacity style={styles.closeModal} onPress={() => this.setState({showDatePicker: false})}>
                <FeatherIcon name="x" color="#FFF" size={24} />
              </TouchableOpacity>
              <View style={styles.dateField}>
                <DateTimePicker textColor="#FFF" date={dateOfBirth} onDateChange={(e) => this.setState({ dateOfBirth: e })} mode="date" androidVariant="nativeAndroid" minimumDate={new Date('1900-01-01')} maximumDate={new Date(Date.now())} />
              </View>
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
  signInUser: (data) => dispatch()
});

export default connect(mapToState, mapToAction)(Register);