import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/styles/styles';
import Feather from 'react-native-vector-icons/Feather';
import colour from '../models/Colour';

class Header extends Component {
  render() {
    const { headerTitle } = this.props;
    console.log(headerTitle);
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.goBack()}>
              <Feather name="chevron-left" size={36} color={colour.primary} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{headerTitle}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Header;