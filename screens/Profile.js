import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, Modal, TextInput, Keyboard, TouchableWithoutFeedback, Alert, ActivityIndicator, ToastAndroid } from 'react-native';
import styles from '../assets/styles/styles';
import colour from '../models/Colour';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import DateTimePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { connect } from 'react-redux';
import { setDataUser } from '../config/redux/action';

class Profile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: this.props.users.id,
      name: this.props.users.name,
      dateOfBirth: new Date(this.props.users.dateOfBirth.seconds*1000),
      phoneNumber: this.props.users.phoneNumber,
      address: this.props.users.address,
      role: this.props.users.role,
      showDatePicker: false,
      showModalPhoto: false,
      loading: false,
      loadingUpload: false
    }
  }

  componentDidMount() {
    console.log(this.state.dateOfBirth);
  }

  doOpenCamera = () => {
    try {
      launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        maxHeight: 1024,
        maxWidth: 1024,
        saveToPhotos: true,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      }, (response) => {
        console.log(response)
        if (response.didCancel) {
          ToastAndroid.show('Camera closed', ToastAndroid.LONG);
          console.log(response.errorMessage);
        } else if (response.errorCode === 'camera_unavailable') {
          ToastAndroid.show('Camera not available', ToastAndroid.LONG);
          console.log(response.errorMessage);
        } else if (response.errorCode === 'permission') {
          ToastAndroid.show('Permission not granted', ToastAndroid.LONG);
          console.log(response.errorMessage);
        } else if (response.errorCode === 'others') {
          ToastAndroid.show(response.errorMessage, ToastAndroid.LONG);
          console.log(response.errorMessage);
        } else {
          const file = response.assets.map(photo => photo.uri);
          this.setState({ loadingUpload: true });
          this.doUploadAvatar(file[0]);
        }
      });
    } catch (error) {
      console.log(error.code, error.message);
    }
  }

  doOpenLibrary = () => {
    try {
      launchImageLibrary({
        mediaType: 'photo',
        cameraType: 'back',
        maxHeight: 1024,
        maxWidth: 1024,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        quality: 0.8,
        selectionLimit: 1
      }, (response) => {
        console.log(response)
        if (response.didCancel) {
          ToastAndroid.show('Camera closed', ToastAndroid.LONG);
          console.log(response.errorMessage);
        } else if (response.errorCode === 'camera_unavailable') {
          ToastAndroid.show('Camera not available', ToastAndroid.LONG);
          console.log(response.errorMessage);
        } else if (response.errorCode === 'permission') {
          ToastAndroid.show('Permission not granted', ToastAndroid.LONG);
          console.log(response.errorMessage);
        } else if (response.errorCode === 'others') {
          ToastAndroid.show(response.errorMessage, ToastAndroid.LONG);
          console.log(response.errorMessage);
        } else {
          const file = response.assets.map(photo => photo.uri);
          this.setState({ loadingUpload: true });
          this.doUploadAvatar(file[0]);
        }
      });
    } catch (error) {
      console.log(error.code, error.message);
    }
  }

  doUploadAvatar = async (file) => {
    try {
      await storage().ref('Avatar/').child(this.state.id).putFile(file).on('state_changed', () => {
        this.getImageFromStorage();
      });
    } catch (error) {
      Alert.alert(error.code, error.message);
      console.log(error.code, error.message);
      this.setState({ loadingUpload: false });
    }
  }

  getImageFromStorage = async () => {
    try {
      var url = await storage().ref('Avatar/').child(this.state.id).getDownloadURL();
      await firestore().collection('users').doc(this.state.id).update({ avatar: url });
      await firestore().collection('users').doc(this.state.id).get().then(user => {
        this.props.updateUserProfile({ id: user.id, ...user.data() });
        this.setState({ loadingUpload: false });
      });
    } catch (error) {
      Alert.alert(error.code, error.message);
      console.log(error.code, error.message);
      this.setState({ loadingUpload: false });
    }
  }

  doChangeProfile = async () => {
    const { name, address, dateOfBirth } = this.state;
    this.setState({ loading: true });
    console.log(this.state.id);
    if (this.validation()) {
      await firestore().collection('users').doc(this.state.id).update({
        name: name,
        dateOfBirth: dateOfBirth,
        address: address
      }).then(async () => {
        const data = await firestore().collection('users').doc(this.state.id).get();
        console.log(data.data());
        ToastAndroid.show('Profile updated!', ToastAndroid.LONG);
        this.props.updateUserProfile({id: data.id, ...data.data()});
        this.setState({ loading: false });
      }).catch((error) => {
        Alert.alert(error.code, error.message);
        console.log(error.code, error.message);
        this.setState({ loading: false });
      });
    }
  }

  validation() {
    const { name, dateOfBirth, phoneNumber, address } = this.state;

    if (name === '') {
      Alert.alert('Warning', 'Name is required!');
      return false;
    } else if (dateOfBirth === '') {
      Alert.alert('Warning', 'Date of Birth is required!');
      return false;
    } else if (phoneNumber === '') {
      Alert.alert('Warning', 'Phone Number is required!');
      return false;
    } else if (address === '') {
      Alert.alert('Warning', 'Address required!');
      return false;
    }

    return true;
  }

  render() {
    const { name, dateOfBirth, phoneNumber, address, role, showDatePicker, showModalPhoto, loading, loadingUpload } = this.state;
    const avatar = this.props.users.avatar;
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
            <Text style={styles.role}>{role}</Text>
          </View>

          <ScrollView scrollEnabled={true} style={{ ...styles.scrollInput, flex: 1 }}>
            <SafeAreaView style={{marginHorizontal: 24, flexGrow: 1}}>

              {/* avatar */}
              <TouchableOpacity onPress={() => this.setState({showModalPhoto: true})} activeOpacity={1} style={{...styles.avatar, backgroundColor: avatar === '' ? colour.primary : '#FFF', width: 84, height: 84, alignSelf: 'center', borderRadius: 80, marginVertical: 10}} >
                {
                  avatar === '' ? <FontAwesome5 name="user" color="#FFF" size={60} />
                    : <Image style={{width: 84, height: 84, borderRadius: 80}} source={{uri: avatar}} resizeMode="cover" />
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
                <TextInput maxLength={15} style={{...styles.inputField, color: '#646464'}} editable={false} placeholder="08xxxxxxxxxx" keyboardType="phone-pad" onChange={(e) => this.setState({phoneNumber: e.nativeEvent.text})} defaultValue={phoneNumber} />

                {/* Address */}
                <Text style={styles.inputTextField}>Address</Text>
                <TextInput style={styles.inputField} multiline={true} placeholder="Your Address" keyboardType="default" onChange={(e) => this.setState({ address: e.nativeEvent.text })} defaultValue={address} />

              </View>

              {/* Button */}
              <Text style={styles.notice}>Phone Number can't be edited!</Text>
              <TouchableOpacity activeOpacity={0.9} style={{...styles.button, marginBottom: 40}} onPress={this.doChangeProfile}>
                <Text style={styles.buttonText}>SUBMIT</Text>
              </TouchableOpacity>

            </SafeAreaView>
          </ScrollView>

          {/* Modal Date Picker */}
          <Modal statusBarTranslucent={true} transparent={true} animationType="slide" onRequestClose={() => this.setState({ showDatePicker: !showDatePicker })} visible={showDatePicker}>
            <View style={styles.modalDatePicker}>
              <TouchableOpacity style={styles.closeModal} onPress={() => this.setState({showDatePicker: false})}>
                <Feather name="x" color="#FFF" size={24} />
              </TouchableOpacity>
              <Text style={styles.titleModal}>Date Of Birth</Text>
              <View style={styles.dateField}>
                <DateTimePicker textColor="#FFF" date={dateOfBirth} onDateChange={(date) => this.setState({ dateOfBirth: date })} mode="date" androidVariant="nativeAndroid" minimumDate={new Date('1900-01-01')} maximumDate={new Date(Date.now())} />
              </View>
            </View>
          </Modal>

          {/* Modal Avatar */}
          <Modal transparent={true} statusBarTranslucent={true} visible={showModalPhoto} onRequestClose={() => this.setState({ showModalPhoto: false })} animationType="slide">
            <View style={{...styles.modalDatePicker, opacity: 1}}>
              <TouchableOpacity style={styles.closeModal} onPress={() => this.setState({showModalPhoto: false})}>
                <Feather name="x" color="#FFF" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.openCamera} onPress={this.doOpenCamera}>
                <Feather name="camera" color="#FFF" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.openCamera, marginLeft: 40}} onPress={this.doOpenLibrary}>
                <Feather name="image" color="#FFF" size={24} />
              </TouchableOpacity>

              <Text style={styles.titleModal}>Avatar</Text>

              { loadingUpload ? <ActivityIndicator animating={true} color={colour.primary} size='large' />
                : (<View style={{ backgroundColor: avatar === '' ? colour.primary : '#000', width: '100%', height: '70%', justifyContent: 'center', alignItems: 'center', marginVertical: 10}} >
                  {
                    avatar === '' ? <FontAwesome5 name="user" color="#FFF" size={200} /> : <Image style={{width: '100%', height: '100%'}} source={{uri: avatar}} resizeMode="cover" />
                  }
                </View>)
              }
            </View>
          </Modal>

          {/* Modal Loading */}
          <Modal statusBarTranslucent={true} transparent={true} animationType="fade" onRequestClose={() => this.setState({ loading: !loading })} visible={loading}>
            <View style={styles.modalDatePicker}>
              <ActivityIndicator animating={true} color={colour.primary} size='large' />
            </View>
          </Modal>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapToState = state => ({
  users: state.users
});

const mapToAction = dispatch => ({
  updateUserProfile: (data) => dispatch(setDataUser(data))
})

export default connect(mapToState, mapToAction)(Profile);