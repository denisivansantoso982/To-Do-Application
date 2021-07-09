import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import styles from '../assets/styles/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colour from '../models/Colour';
import tempData from '../models/tempData';

class Landing extends Component {
  constructor () {
    super();
    this.state = {
      photo: ''
    }
  }

  gotoDashboard = (navigate) => {
    this.props.navigation.navigate('task', {priority: navigate});
  }

  render() {
    const { photo } = this.state;
    var urgent = tempData.filter(item => item.priority == 'Urgent').length.toString();
    var high = tempData.filter(item => item.priority == 'High').length.toString();
    var normal = tempData.filter(item => item.priority == 'Normal').length.toString();
    var low = tempData.filter(item => item.priority == 'Low').length.toString();
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Landing</Text>
          <TouchableOpacity activeOpacity={1} style={styles.avatar} onPress={() => this.props.navigation.push('profile')} >
            {
              photo === '' ? <FontAwesome5 name="user" color="#FFF" size={24} />
              : <Image style={{ width: 30, height: 30 }} source={{ uri: photo }} resizeMode="stretch" />
            }
          </TouchableOpacity>
        </View>

        <ScrollView scrollEnabled={true} style={{...styles.scrollInput, flex: 1}}>
          <View style={{paddingBottom: 20}}>

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

          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Landing;