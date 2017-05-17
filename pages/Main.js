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
import Search from '../Components/Search';
import Icon from 'react-native-vector-icons/Wz';
export default class Main extends Component {
  static navigationOptions = {
    title:'主页',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="homeicon" size={25} color={tintColor} />
    )
  }
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <Search/>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151515',
  },
});

