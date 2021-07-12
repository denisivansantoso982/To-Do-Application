import React, { Component } from 'react';
import { View, Text, VirtualizedList, TouchableOpacity, Alert } from 'react-native';
import styles from '../assets/styles/styles';
import colour from '../models/Colour';
import ListComponent from './ListComponent';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';

class Done extends Component {
  doDeleteTask = (id) => {
    try {
      Alert.alert('Warning', 'Are you sure to delete this task?', [
        { text: 'Yes', style: 'destructive', onPress: async () => await firestore().collection('listTodo').doc(id).delete() },
        { text: 'No', style: 'cancel' }
      ]);
    } catch (error) {
      Alert.alert(error.code, error.message);
      console.log(error.code, error.message);
    }
  }

  renderList = (item) => {
    return (
      <TouchableOpacity onPress={() => this.props.detailTask(item.item.dataItem, {item: item.item.dataItem})} activeOpacity={1}>
        <ListComponent style={styles.list}>
          <Text style={{...styles.contentList, alignSelf: 'flex-start', fontSize: 16, flex: 3}}>{item.item.dataItem.title}</Text>
          <Text style={{ ...styles.contentList, alignSelf: 'flex-start', fontSize: 12, flex: 3, marginTop: 24 }}>{item.item.dataItem.endDate}</Text>
          {
            this.props.userRole === 'Admin' ? (<TouchableOpacity activeOpacity={0.8} style={{flex: 1, alignItems: 'flex-end'}} onPress={() => this.doDeleteTask(item.item.dataItem.id)}>
              <Feather name="x" color={colour.primary} size={20} />
            </TouchableOpacity>) : null
          }
        </ListComponent>
      </TouchableOpacity>
    );
  }

  render() {
    const priority = this.props.priorityTask;
    var done = this.props.todoList.filter(item => item.status == 'Done' && item.priority == priority);
    return (
      <View style={{flex: 1}}>
        <VirtualizedList
          style={{marginTop: 10, marginBottom: 8, paddingHorizontal: 5}}
          data={done}
          keyExtractor={(item, index) => item.dataItem.id}
          getItem={(item, index) => { return{ dataItem: item[index] }}}
          getItemCount={item => item.length}
          initialNumToRender={5}
          renderItem={(item) => this.renderList(item)} />
      </View>
    );
  }
}

export default Done;