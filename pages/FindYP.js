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
  ScrollView,
  WebView
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
  receiveMessage (e) {
        let message = e.nativeEvent.data
    }
  render() {
    return (
      <View style={styles.container}>
      <WebView
            automaticallyAdjustContentInsets={false}
            style={styles.webView}
            source={require('../fw/main.html')}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onMessage={this.receiveMessage.bind(this)}
            decelerationRate="normal"
            startInLoadingState={false}
            scalesPageToFit={false} />
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

