import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Keyboard, TouchableWithoutFeedback, Alert, ToastAndroid, SafeAreaView, ActivityIndicator } from 'react-native';
import styles from '../assets/styles/styles';
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import colour from '../models/Colour';
import DateTimePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { connect } from 'react-redux';

class AddTask extends Component {
  constructor () {
    super();
    this.state = {
      title: '',
      priority: 'Low',
      status: 'Todo',
      startDate: new Date(Date.now()).toDateString(),
      endDate: new Date(Date.now()).toDateString(),
      assignmentTo: 'null',
      assignmentFrom: '',
      doingDate: '',
      doneDate: '',
      detail: '',
      showModalStartDate: false,
      showModalEndDate: false,
      loading: false
    }
  }

  componentDidMount() {
    this.setState({ assignmentFrom: this.props.users.id });
  }

  doSendList = async () => {
    const { title, priority, status, startDate, endDate, assignmentTo, assignmentFrom, doingDate, doneDate, detail } = this.state;
    this.setState({ loading: true });
    try {
      if (this.validation()) {
        await firestore().collection('listTodo').add({
          title: title,
          priority: priority,
          status: status,
          startDate: startDate,
          endDate: endDate,
          assignmentTo: assignmentTo,
          assignmentFrom: assignmentFrom,
          doingDate: doingDate,
          doneDate: doneDate,
          detail: detail
        }).then(() => {
          let user = this.props.allUsers.filter(user => user.id === assignmentTo);
          console.log(user[0].token);
          this.doSendMessage(user[0].token);
        });
      }
    } catch (error) {
      Alert.alert(error.code, error.message);
      console.log(error.code, error.message);
      this.setState({ loading: false });
    }
  }

  doSendMessage = async (token) => {
    try {
      await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'key=AAAAdh5gGg0:APA91bHPwRpqzF-EwBnXdAZCLOXTRFPHYbh5ATlVlVI4aDirpSgdjsEtgK9qr-XYO2if982N53PXroBYcMNH8uGX9gE19ApO468gXkxNPp4rE-N0f9ro7FOyFlKXZSbtLHRd62K-X7JA'
        },
        body: JSON.stringify({
          'registration_ids': [token],
          'notification': {
            'title': 'New Task for you!',
            'body': 'See here for more detail!',
            'vibrate': 1,
            'sound': 1,
            'priority': 'high',
            'content_available': true,
            'show_in_foreground': true
          },
          'data': {},
          'direct_book_ok': true
        })
      });
      this.setState({ loading: false });
      ToastAndroid.show('Task added!', ToastAndroid.LONG);
      this.props.navigation.goBack();
    } catch (error) {
      Alert.alert(error.code, error.message);
      console.log(error.code, error.message);
      this.setState({ loading: false });
    }
  }

  validation() {
    const { title, startDate, endDate, assignmentTo, detail } = this.state;
    var start = new Date(Date.parse(startDate));
    var end = new Date(Date.parse(endDate));

    if (title === '') {
      Alert.alert('Warning', 'Title is required!');
      return false;
    } else if (startDate === '') {
      Alert.alert('Warning', 'Start Date is required!');
      return false;
    } else if (endDate === '') {
      Alert.alert('Warning', 'End Date is required!');
      return false;
    } else if (assignmentTo === 'null') {
      Alert.alert('Warning', 'Assignment is required!');
      return false;
    } else if (detail === '') {
      Alert.alert('Warning', 'Detail is required!');
      return false;
    } else if (start > end) {
      Alert.alert('Warning', 'End Date is not match!');
      return false;
    }

    return true;
  }

  render() {
    const { title, priority, startDate, endDate, assignmentTo, detail, showModalStartDate, showModalEndDate, loading } = this.state;
    const allUsers = this.props.allUsers;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>

          <View style={styles.header}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.goBack()}>
                <Feather name="chevron-left" size={36} color={colour.primary} />
              </TouchableOpacity>
              <Text style={styles.headerText}>New Task</Text>
            </View>
          </View>

          <ScrollView scrollEnabled={true} style={{ ...styles.scrollInput, flex: 1 }}>
            <SafeAreaView style={{flexGrow: 1, marginHorizontal: 24}}>

              <View style={styles.cardInput}>

                {/* Title  */}
                <Text style={styles.inputTextField}>Title</Text>
                <TextInput style={styles.inputField} placeholder="Title" keyboardType="default" onChange={(e) => this.setState({title: e.nativeEvent.text})} defaultValue={title} />

                {/* Priority */}
                <Text style={styles.inputTextField}>Priority</Text>
                <View style={styles.inputField}>
                  <Picker selectedValue={priority} style={{fontFamily: 'Poppins-Medium'}} itemStyle={{fontFamily: 'Poppins-Bold'}} onValueChange={(value, index) => this.setState({ priority: value })}>
                    <Picker.Item label="Low" value="Low" />
                    <Picker.Item label="Normal" value="Normal" />
                    <Picker.Item label="High" value="High" />
                    <Picker.Item label="Urgent" value="Urgent" />
                    </Picker>
                  </View>

                {/* Assignment To */}
                <Text style={styles.inputTextField}>Assignment To</Text>
                <View style={styles.inputField}>
                  <Picker selectedValue={assignmentTo} style={{fontFamily: 'Poppins-Medium'}} itemStyle={{fontFamily: 'Poppins-Bold'}} onValueChange={(value, index) => this.setState({ assignmentTo: value })}>
                    <Picker.Item value="null" label="Select User here" />
                    {
                      allUsers.map(users => <Picker.Item key={users.id} value={users.id} label={users.name} />)
                    }
                  </Picker>
                </View>

                {/* Start Date */}
                <Text style={styles.inputTextField}>Start Date</Text>
                <TextInput style={styles.inputField} onFocus={() => { Keyboard.dismiss(); this.setState({ showModalStartDate: true }); }} defaultValue={startDate} />

                {/* End Date */}
                <Text style={styles.inputTextField}>End Date</Text>
                <TextInput style={styles.inputField} onFocus={() => { Keyboard.dismiss(); this.setState({ showModalEndDate: true }); }} defaultValue={endDate} />

                {/* Detail  */}
                <Text style={styles.inputTextField}>Detail</Text>
                <TextInput style={{...styles.inputField, height: 42}} multiline={true} placeholder="Detail Task" keyboardType="default" onChange={(e) => this.setState({ detail: e.nativeEvent.text })} defaultValue={detail} />

              </View>

              {/* Button */}
              <Text style={styles.notice}>This task will be automatically set to Todo status</Text>
              <TouchableOpacity activeOpacity={0.9} style={{ ...styles.button, marginBottom: 40 }} onPress={this.doSendList}>
                <Text style={styles.buttonText}>ADD</Text>
              </TouchableOpacity>

            </SafeAreaView>
          </ScrollView>

          {/* Modal End Date */}
          <Modal statusBarTranslucent={true} transparent={true} animationType="slide" onRequestClose={() => this.setState({ showModalEndDate: !showModalEndDate })} visible={showModalEndDate}>
            <View style={styles.modalDatePicker}>
              <TouchableOpacity style={styles.closeModal} onPress={() => this.setState({showModalEndDate: false})}>
                <Feather name="x" color="#FFF" size={24} />
              </TouchableOpacity>
              <Text style={styles.titleModal}>End Date</Text>
              <View style={styles.dateField}>
                <DateTimePicker textColor="#FFF" date={new Date(Date.parse(endDate))} onDateChange={(date) => this.setState({ endDate: date.toDateString() })} mode="date" androidVariant="nativeAndroid" minimumDate={new Date(Date.now())} />
              </View>
            </View>
          </Modal>

          {/* Modal Start Date */}
          <Modal statusBarTranslucent={true} transparent={true} animationType="slide" onRequestClose={() => this.setState({ showModalStartDate: !showModalStartDate })} visible={showModalStartDate}>
            <View style={styles.modalDatePicker}>
              <TouchableOpacity style={styles.closeModal} onPress={() => this.setState({showModalStartDate: false})}>
                <Feather name="x" color="#FFF" size={24} />
              </TouchableOpacity>
              <Text style={styles.titleModal}>Start Date</Text>
              <View style={styles.dateField}>
                <DateTimePicker textColor="#FFF" date={new Date(Date.parse(startDate))} onDateChange={(date) => this.setState({ startDate: date.toDateString() })} mode="date" androidVariant="nativeAndroid"  minimumDate={new Date(Date.now())} />
              </View>
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
  users: state.users,
  todoList: state.todo,
  allUsers: state.allUsers
});

const mapToAction = dispatch => ({

});

export default connect(mapToState, mapToAction)(AddTask);