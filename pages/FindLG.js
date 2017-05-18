/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Wz';
import DesignList from '../Components/DesignList';
export default class FindLG extends Component {
  static navigationOptions = {
    title:'找灵感',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="mindicon" size={26} color={tintColor} />
    )
  }
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <View>
          <DesignList/>
        </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
  },
});

