import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../assets/styles/styles';

class ListComponent extends Component {
  render() {
    return (
      <View style={{...styles.listOutline, ...this.props.style}}>
        {this.props.children}
      </View>
    )
  }
}

export default ListComponent;