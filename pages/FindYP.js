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
export default class FindYP extends Component {
  static navigationOptions = {
    headerTitle:'找优品',
    title:'找优品',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="goodicon" size={25} color={tintColor}  style={{marginTop:1.5}}/>
    ),
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

