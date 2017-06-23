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
export default class FindLG extends Component {
  static navigationOptions = {
    headerTitle:'找灵感',
    title:'找灵感',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="mindicon" size={26} color={tintColor} />
    )
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

