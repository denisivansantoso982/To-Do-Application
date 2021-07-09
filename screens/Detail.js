import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from '../assets/styles/styles';
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import colour from '../models/Colour';
import DateTimePicker from 'react-native-date-picker';

class Detail extends Component {
  constructor () {
    super();
    this.state = {
      id: '',
      title: '',
      priority: 'Low',
      status: '',
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
      assignmentTo: [],
      assignmentToString: '',
      assignmentFrom: '',
      doingDate: null,
      doneDate: null,
      detail: '',
      showModalStartDate: false,
      showModalEndDate: false,
      showModalAssignment: false,
    }
  }

  render() {
    const { id, title, priority, status, startDate, endDate, assignmentFrom, assignmentToString, assignmentTo, doingDate, doneDate, detail, showModalStartDate, showModalEndDate, showModalAssignment } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>

          <View style={styles.header}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.goBack()}>
                <Feather name="chevron-left" size={36} color={colour.primary} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Detail Task</Text>
            </View>
          </View>

          <ScrollView scrollEnabled={true} style={{ ...styles.scrollInput, flex: 1 }}>
            <View style={{marginHorizontal: 24}}>

              <View style={styles.cardInput}>

                {/* Title  */}
                <Text style={styles.inputTextField}>Title</Text>
                <TextInput style={styles.inputFieldReadOnly} placeholder="Title" keyboardType="default" onChange={(e) => this.setState({title: e.nativeEvent.text})} defaultValue={title} />

                {/* Priority */}
                <Text style={styles.inputTextField}>Priority</Text>
                <TextInput style={styles.inputFieldReadOnly} placeholder="Priority" keyboardType="default" onChange={(e) => this.setState({priority: e.nativeEvent.text})} defaultValue={priority} />

                {/* Assignment From */}
                <Text style={styles.inputTextField}>Assignment From</Text>
                <TextInput placeholder="Assignment from" style={styles.inputFieldReadOnly} defaultValue={assignmentFrom} />

                {/* End Date */}
                <Text style={styles.inputTextField}>End Date</Text>
                <TextInput style={styles.inputFieldReadOnly} onFocus={() => { Keyboard.dismiss(); this.setState({ showModalEndDate: true }); }} defaultValue={endDate.toDateString()} />

                {/* Detail  */}
                <Text style={styles.inputTextField}>Detail</Text>
                <TextInput style={{...styles.inputFieldReadOnly, height: 42}} multiline={true} placeholder="Detail Task" keyboardType="default" onChange={(e) => this.setState({ detail: e.nativeEvent.text })} defaultValue={detail} />

              </View>

              {/* Button */}
              <Text style={styles.notice}>This task will be automatically upgrade the status</Text>
              <TouchableOpacity activeOpacity={0.9} style={{...styles.button, marginBottom: 40}}>
                <Text style={styles.buttonText}>UPGRADE STATUS</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>

          <Modal statusBarTranslucent={true} transparent={true} animationType="slide" onRequestClose={() => this.setState({ showModalEndDate: !showModalEndDate })} visible={showModalEndDate}>
            <View style={styles.modalDatePicker}>
              <TouchableOpacity style={styles.closeModal} onPress={() => this.setState({showModalEndDate: false})}>
                <Feather name="x" color="#FFF" size={24} />
              </TouchableOpacity>
              <View style={styles.dateField}>
                <DateTimePicker textColor="#FFF" date={endDate} onDateChange={(date) => this.setState({ endDate: date })} mode="date" androidVariant="nativeAndroid" minimumDate={new Date(Date.now())} />
              </View>
            </View>
          </Modal>

          <Modal statusBarTranslucent={true} transparent={true} animationType="slide" onRequestClose={() => this.setState({ showModalAssignment: !showModalAssignment })} visible={showModalAssignment}>
            <View style={styles.modalDatePicker}>
              <TouchableOpacity style={styles.closeModal} onPress={() => this.setState({showModalAssignment: false})}>
                <Feather name="x" color="#FFF" size={24} />
              </TouchableOpacity>
              <View style={styles.dateField}>

              </View>
            </View>
          </Modal>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Detail;