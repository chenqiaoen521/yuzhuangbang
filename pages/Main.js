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
  Alert
} from 'react-native';
import Search from '../Components/Search';
import Slider from '../Components/Slider';
import Notice from '../Components/Notice';
import HomeTitle from '../Components/HomeTitle';
import DesignList from '../Components/DesignList';
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
      <View style={{alignItems: 'center'}}>
        <Search/>
      </View>
        <View style={{marginTop:5}}>
          <Slider/>
        </View>
        <View style={{marginTop:5}}>
          <Notice/>
        </View>
        <HomeTitle/>
        <View>
          <DesignList popToHome={(data)=>this.toDesignView(data)}/>
        </View>
      </ScrollView>
      </View>
    );
  }
  toDesignView (data) {
    const {navigate} = this.props.navigation;
    navigate('MainDetail',{title:'时尚简约风格'})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
  },
});

