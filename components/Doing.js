import React, { Component } from 'react';
import { View, Text, VirtualizedList, TouchableOpacity } from 'react-native';
import styles from '../assets/styles/styles';
import colour from '../models/Colour';
import tempData from '../models/tempData';
import ListComponent from './ListComponent';
import Feather from 'react-native-vector-icons/Feather';

class Doing extends Component {
  componentDidMount() {
  }

  renderList = (item) => {
    console.log(item.item.dataItem.id);
    return (
      <TouchableOpacity onPress={() => this.props.detailTask(item.item.dataItem)} activeOpacity={1}>
        <ListComponent style={styles.list}>
          <Text style={{...styles.contentList, alignSelf: 'flex-start', fontSize: 16, flex: 3}}>{item.item.dataItem.title}</Text>
          <Text style={{ ...styles.contentList, alignSelf: 'flex-start', fontSize: 12, flex: 3, marginTop: 24 }}>{item.item.dataItem.startDate.toDateString()}</Text>
          <TouchableOpacity activeOpacity={0.8} style={{flex: 1, alignItems: 'flex-end'}}>
            <Feather name="x" color={colour.primary} size={20} />
          </TouchableOpacity>
        </ListComponent>
      </TouchableOpacity>
    );
  }

  render() {
    const priority = this.props.priorityTask;
    var doing = tempData.filter(item => item.status == 'Doing' && item.priority == priority);
    console.log("doing : " + JSON.stringify(doing));
    return (
      <View style={{flex: 1}}>
        <VirtualizedList
          style={{marginTop: 10, marginBottom: 8, paddingHorizontal: 5}}
          data={doing}
          keyExtractor={(item, index) => item.dataItem.id}
          getItem={(item, index) => { return{ dataItem: item[index] }}}
          getItemCount={item => item.length}
          initialNumToRender={10}
          renderItem={(item) => this.renderList(item)} />
      </View>
    );
  }
}

export default Doing;