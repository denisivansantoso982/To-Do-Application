import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from '../assets/styles/styles';
import colour from '../models/Colour';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import DateTimePicker from 'react-native-date-picker';

class Profile extends Component {
  constructor () {
    super();
    this.state = {
      name: '',
      dateOfBirth: new Date(Date.now()),
      phoneNumber: '',
      address: '',
      photo: '',
      showDatePicker: false,
      showModalPhoto: false
    }
  }

  render() {
    const { name, dateOfBirth, phoneNumber, address, photo, showDatePicker, showModalPhoto } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.goBack()}>
                <Feather name="chevron-left" size={36} color={colour.primary} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Profile</Text>
            </View>
            <Text style={styles.role}>Admin</Text>
          </View>

          <ScrollView scrollEnabled={true} style={{ ...styles.scrollInput, flex: 1 }}>
            <View style={{marginHorizontal: 24}}>

              {/* avatar */}
              <TouchableOpacity onPress={() => this.setState({showModalPhoto: true})} activeOpacity={1} style={{...styles.avatar, width: 84, height: 84, alignSelf: 'center', borderRadius: 80, marginVertical: 10}} >
                {
                  photo === '' ? <FontAwesome5 name="user" color="#FFF" size={60} />
                    : <Image style={{width: 60, height: 60}} source={{uri: photo}} resizeMode="stretch" />
                }
              </TouchableOpacity>

              <View style={styles.cardInput}>

                {/* Name  */}
                <Text style={styles.inputTextField}>Name</Text>
                <TextInput style={styles.inputField} placeholder="Your Name" keyboardType="default" onChange={(e) => this.setState({name: e.nativeEvent.text})} defaultValue={name} />

                {/* dateOfBirth */}
                <Text style={styles.inputTextField}>Date of Birth</Text>
                <TextInput style={styles.inputField} onFocus={() => { Keyboard.dismiss(); this.setState({ showDatePicker: true }); }} defaultValue={dateOfBirth.toDateString()} />

                {/* phoneNumber */}
                <Text style={styles.inputTextField}>Phone Number</Text>
                <TextInput maxLength={15} style={styles.inputField} editable={false} placeholder="08xxxxxxxxxx" keyboardType="phone-pad" onChange={(e) => this.setState({phoneNumber: e.nativeEvent.text})} defaultValue={phoneNumber} />

                {/* Address */}
                <Text style={styles.inputTextField}>Address</Text>
                <TextInput style={styles.inputField} multiline={true} placeholder="Your Address" keyboardType="default" onChange={(e) => this.setState({ address: e.nativeEvent.text })} defaultValue={address} />

              </View>

              {/* Button */}
              <Text style={styles.notice}>Phone Number can't be edited!</Text>
              <TouchableOpacity activeOpacity={0.9} style={{...styles.button, marginBottom: 40}}>
                <Text style={styles.buttonText}>SUBMIT</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>

          <Modal statusBarTranslucent={true} transparent={true} animationType="slide" onRequestClose={() => this.setState({ showDatePicker: !showDatePicker })} visible={showDatePicker}>
            <View style={styles.modalDatePicker}>
              <TouchableOpacity style={styles.closeModal} onPress={() => this.setState({showDatePicker: false})}>
                <Feather name="x" color="#FFF" size={24} />
              </TouchableOpacity>
              <View style={styles.dateField}>
                <DateTimePicker textColor="#FFF" date={dateOfBirth} onDateChange={(date) => this.setState({ dateOfBirth: date })} mode="date" androidVariant="nativeAndroid" minimumDate={new Date('1900-01-01')} maximumDate={new Date(Date.now())} />
              </View>
            </View>
          </Modal>

          <Modal transparent={true} statusBarTranslucent={true} visible={showModalPhoto} onRequestClose={() => this.setState({ showModalPhoto: false })} animationType="slide">
            <View style={styles.modalDatePicker}>

            </View>
          </Modal>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Profile;