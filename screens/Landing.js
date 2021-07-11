import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import styles from '../assets/styles/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colour from '../models/Colour';
import tempData from '../models/tempData';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import { setAllUsers, setListTodo } from '../config/redux/action';

class Landing extends Component {
  constructor () {
    super();
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    const users = this.props.users;
    try {
      await firestore().collection('listTodo').where('assignmentTo', '==', users.id).onSnapshot(async (querySnapshot) => {
        let lists = [];
        querySnapshot.forEach(doc => {
          lists.push({ id: doc.id, ...doc.data() });
        });

        await this.props.getListTodo(lists);
        this.getAllUsers();
      });
    } catch (error) {
      Alert.alert(error.code, error.message);
      console.log(error.code, error.message);
      this.setState({ loading: false });
    }
  }

  getAllUsers = async () => {
    try {
      await firestore().collection('users').onSnapshot(async (querySnapshot) => {
        let lists = [];
        querySnapshot.forEach(doc => {
          lists.push({ id: doc.id, ...doc.data() });
        });

        await this.props.getAllUsersData(lists);
        this.setState({ loading: false });
      });
    } catch (error) {
      Alert.alert(error.code, error.message);
      console.log(error.code, error.message);
      this.setState({ loading: false });
    }
  }

  gotoDashboard = (navigate) => {
    this.props.navigation.navigate('task', {priority: navigate});
  }

  async doSignOut() {
    try {
      const uid = await store.getState().users.id;
      console.log('uid : ' + uid);
      await firestore().collection('users').doc(uid).update({ token: 'null' });
      await auth().signOut().then(() => this.props.navigation.replace('login'));
    } catch {
      console.log('catch');
      this.props.navigation.replace('login');
    }
  }

  render() {
    const { loading } = this.state;
    var users = this.props.users;
    var todo = this.props.todoList;
    const { avatar } = users;
    var urgent = todo.filter(item => item.priority == 'Urgent').length.toString();
    var high = todo.filter(item => item.priority == 'High').length.toString();
    var normal = todo.filter(item => item.priority == 'Normal').length.toString();
    var low = todo.filter(item => item.priority == 'Low').length.toString();
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Landing</Text>
          <TouchableOpacity activeOpacity={1} style={styles.avatar} onPress={() => this.props.navigation.push('profile')} >
            {
              avatar === '' ? <FontAwesome5 name="user" color="#FFF" size={24} />
              : <Image style={{ width: 36, height: 36, borderRadius: 20 }} source={{ uri: avatar }} resizeMode="cover" />
            }
          </TouchableOpacity>
        </View>

        <ScrollView scrollEnabled={true} style={{...styles.scrollInput, flex: 1}}>
          <SafeAreaView style={{paddingBottom: 20}}>

            <View style={styles.gridContainer}>
              <TouchableOpacity activeOpacity={0.9} style={{ ...styles.touchableContainer, backgroundColor: colour.urgent }} onPress={() => this.gotoDashboard('Urgent')}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                  <Text style={styles.titlePriority}>Urgent</Text>
                  <FontAwesome5 name="angle-double-up" color="#FFF" size={32} />
                </View>
                <View style={styles.parentTextPriority}>
                  <Text style={{...styles.textPriority, fontSize: 28, fontFamily: 'Poppins-SemiBold'}}>{urgent}</Text>
                  <Text style={{...styles.textPriority, marginBottom: 50}}> Total Task </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.9} style={{ ...styles.touchableContainer, backgroundColor: colour.low }} onPress={() => this.gotoDashboard('Low')}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                  <Text style={styles.titlePriority}>Low</Text>
                  <FontAwesome5 name="sort-amount-down-alt" color="#FFF" size={32} />
                </View>
                <View style={styles.parentTextPriority}>
                  <Text style={{...styles.textPriority, fontSize: 28, fontFamily: 'Poppins-SemiBold'}}>{low}</Text>
                  <Text style={{...styles.textPriority, marginBottom: 50}}> Total Task </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.gridContainer}>
              <TouchableOpacity activeOpacity={0.9} style={{ ...styles.touchableContainer, backgroundColor: colour.high }} onPress={() => this.gotoDashboard('High')}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                  <Text style={styles.titlePriority}>High</Text>
                  <FontAwesome5 name="sort-amount-up" color="#FFF" size={32} />
                </View>
                <View style={styles.parentTextPriority}>
                  <Text style={{...styles.textPriority, fontSize: 28, fontFamily: 'Poppins-SemiBold'}}>{high}</Text>
                  <Text style={{...styles.textPriority, marginBottom: 50}}> Total Task </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.9} style={{ ...styles.touchableContainer, backgroundColor: colour.normal }} onPress={() => this.gotoDashboard('Normal')}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                  <Text style={styles.titlePriority}>Normal</Text>
                  <FontAwesome5 name="equals" color="#FFF" size={32} />
                </View>
                <View style={styles.parentTextPriority}>
                  <Text style={{ ...styles.textPriority, fontSize: 28, fontFamily: 'Poppins-SemiBold' }}>{normal}</Text>
                  <Text style={{...styles.textPriority, marginBottom: 50}}> Total Task </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Button */}
            <TouchableOpacity activeOpacity={0.9} style={{ ...styles.button, marginHorizontal: 10 }} onPress={() => this.props.navigation.replace('login')}>
              <Text style={styles.buttonText}>LOGOUT</Text>
            </TouchableOpacity>

          </SafeAreaView>
        </ScrollView>

        {/* Modal Loading */}
        <Modal statusBarTranslucent={true} transparent={true} animationType="fade" onRequestClose={() => this.setState({ loading: !loading })} visible={loading}>
          <View style={styles.modalDatePicker}>
            <ActivityIndicator animating={true} color={colour.primary} size='large' />
          </View>
        </Modal>

      </View>
    );
  }
}

const mapToState = state => ({
  users: state.users,
  todoList: state.todo
});

const mapToAction = dispatch => ({
  getListTodo: (data) => dispatch(setListTodo(data)),
  getAllUsersData: (data) => dispatch(setAllUsers(data))
});

export default connect(mapToState, mapToAction)(Landing);