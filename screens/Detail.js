import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, TextInput, Keyboard, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator, ToastAndroid } from 'react-native';
import styles from '../assets/styles/styles';
import Feather from 'react-native-vector-icons/Feather';
import colour from '../models/Colour';
import store from '../config/redux/store';
import firestore from '@react-native-firebase/firestore';

class Detail extends Component {
  constructor () {
    super();
    this.state = {
      userAssignmentFrom: {},
      loading: true
    }
  }

  async componentDidMount() {
    const { assignmentFrom } = this.props.route.params.data;
    try {
      await firestore().collection('users').doc(assignmentFrom).get().then((user) => {
        this.setState({ userAssignmentFrom: { id: user.id, ...user.data() }, loading: false });
      });
    } catch (error) {
      Alert.alert(error.code, error.message);
      console.log(error.code, error.message);
      this.setState({ loading: false });
    }
  }

  doUpgradeStatus = async () => {
    const { id, title, priority, status, startDate, endDate, assignmentFrom, assignmentTo, doingDate, doneDate, detail } = this.props.route.params.data;
    this.setState({ loading: true });
    try {
      if (status === 'Todo') {
        await firestore().collection('listTodo').doc(id).update({
          status: 'Doing',
          doingDate: new Date(Date.now())
        });
      } else if (status === 'Doing') {
        await firestore().collection('listTodo').doc(id).update({
          status: 'Done',
          doneDate: new Date(Date.now())
        });
      }

      await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'key=AAAAKsIXSHQ:APA91bGzIUGdQFRYJB141NSejwDptWfR9_WAgmL1ar8rl9ryt8Nsq1d_E3413ohCUcELoBXJ1qTe_SR3s5e-jY0XryY0VFfnH7ecOu4SpwP-pBwIlikSDPTMbRmaYBFhqkfpLcdns1fa'
        },
        body: JSON.stringify({
          'registration_ids': [this.state.userAssignmentFrom.token],
          'notification': {
            'title': title + ' updated!',
            'body': 'Click here for more information!',
            'android': {
              'vibrate': 1,
              'sound': 'default',
              'priority': 'high',
              'content_available': true,
              'show_in_foreground': true
            }
          },
          'data': {},
          'direct_book_ok': true
        })
      });

      ToastAndroid.show('Task upgraded!', ToastAndroid.LONG);
      this.setState({ loading: false });
      this.props.navigation.goBack();
    } catch (error) {
      Alert.alert(error.code, error.message);
      console.log(error.code, error.message);
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    const { id, title, priority, status, startDate, endDate, assignmentFrom, assignmentTo, doingDate, doneDate, detail } = this.props.route.params.data;
    const start = new Date(startDate.seconds * 1000);
    const end = new Date(endDate.seconds * 1000);
    const users = store.getState().allUsers;
    const assignment = users.filter(data => data.id === assignmentFrom);
    return (
        <View style={{ flex: 1 }}>

          <View style={styles.header}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.goBack()}>
                <Feather name="chevron-left" size={36} color={colour.primary} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Detail Task</Text>
            </View>
          </View>

          <ScrollView scrollEnabled={true} style={{...styles.scrollInput, flex: 1}}>
            <SafeAreaView style={{flexGrow: 1, marginHorizontal: 24}}>

              <View style={styles.cardInput}>
                {/* Title  */}
                <Text style={styles.inputTextField}>Title</Text>
                <Text style={styles.inputFieldReadOnly}>{title}</Text>

                {/* Priority */}
                <Text style={styles.inputTextField}>Priority</Text>
                <Text style={styles.inputFieldReadOnly}>{priority}</Text>

                {/* Status */}
                <Text style={styles.inputTextField}>Status</Text>
                <Text style={styles.inputFieldReadOnly}>{status}</Text>

                {/* Assignment From */}
                <Text style={styles.inputTextField}>Assignment From</Text>
                <Text style={styles.inputFieldReadOnly}>{assignment[0].name}</Text>

                {/* Start Date */}
                <Text style={styles.inputTextField}>Start Date</Text>
                <Text style={styles.inputFieldReadOnly}>{start.toDateString()}</Text>

                {/* End Date */}
                <Text style={styles.inputTextField}>End Date</Text>
                <Text style={styles.inputFieldReadOnly}>{end.toDateString()}</Text>

                {/* Detail  */}
                <Text style={styles.inputTextField}>Detail</Text>
                <Text style={styles.inputFieldReadOnly}>{detail}</Text>
              </View>

            {/* Button */}
            {
              status === 'Done' ? <Text style={{...styles.subTitleText, color: colour.primary, marginBottom: 20}}>Status can't be upgrade because the status already Done</Text>
              : (<TouchableOpacity activeOpacity={0.9} style={{ ...styles.button, marginBottom: 40 }} onPress={this.doUpgradeStatus}>
                <Text style={styles.buttonText}>UPGRADE STATUS</Text>
              </TouchableOpacity>)
            }

            </SafeAreaView>
          </ScrollView>

          <Modal statusBarTranslucent={true} transparent={true} animationType="fade" onRequestClose={() => this.setState({ loading: !loading })} visible={loading}>
            <View style={styles.modalDatePicker}>
              <ActivityIndicator animating={true} color={colour.primary} size='large' />
            </View>
          </Modal>

        </View>
    );
  }
}

export default Detail;