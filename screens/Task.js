import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Todo from '../components/Todo'
import Done from '../components/Done'
import Doing from '../components/Doing'
import styles from '../assets/styles/styles';
import Feather from 'react-native-vector-icons/Feather';
import colour from '../models/Colour';

const Tab = createBottomTabNavigator();

class Task extends Component {
  gotoDetail = (data) => {
    this.props.navigation.navigate('detail', { data });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.goBack()}>
              <Feather name="chevron-left" size={36} color={colour.primary} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Task</Text>
          </View>
          <TouchableOpacity style={{paddingBottom: 4}} activeOpacity={0.9} onPress={() => this.props.navigation.navigate('addTask')}>
            <Feather name="plus" size={28} color={colour.primary} />
          </TouchableOpacity>
        </View>

        <Tab.Navigator
          initialRouteName="Todo"
          tabBarOptions={{
            inactiveBackgroundColor: colour.primary,
            activeBackgroundColor: colour.secondary, labelStyle: styles.labelStyle
          }}>
          <Tab.Screen name="Todo" children={() => <Todo priorityTask={this.props.route.params.priority} detailTask={(data) => this.gotoDetail(data)} />} />
          <Tab.Screen name="Doing" children={() => <Doing priorityTask={this.props.route.params.priority} detailTask={(data) => this.gotoDetail(data)} />} />
          <Tab.Screen name="Done" children={() => <Done priorityTask={this.props.route.params.priority} detailTask={(data) => this.gotoDetail(data)} />} />
        </Tab.Navigator>
      </View>
    );
  }
}

export default Task;