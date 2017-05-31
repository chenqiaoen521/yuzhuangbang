/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Main  from './pages/Main';
import FindLG  from './pages/FindLG';
import FindYP  from './pages/FindYP';
import Center  from './pages/Center';
import Splash from './pages/Splash';
import SearchPage from './pages/SearchPage';
import MainDetail  from './pages/MainDetail';
import Settings  from './pages/Settings';
import PersonInfo  from './pages/PersonInfo';
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';

const TabContainer = TabNavigator({
    Main: { screen: Main},
    FindLG: { screen: FindLG },
    FindYP: { screen: FindYP },
    Center: { screen: Center }
},{
    animationEnabled: true, 
    swipeEnabled: true, 
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#ae8300',
      inactiveTintColor: '#ffffff',
      showIcon: true,
      style: {
        backgroundColor: '#2a2a2a'
      },
      indicatorStyle: {
        opacity: 0
      },
      tabStyle: {
        padding: 0
      }
    }
  });

const Root = StackNavigator(
  {
    Splash:{
      screen:Splash
    },
    Index: {
      screen: TabContainer,
      navigationOptions: {
        headerLeft: null
      }
    },
    MainDetail:{
      screen:MainDetail,
    },
    SearchPage:{
      screen:SearchPage
    },
    Settings:{
      screen:Settings
    },
    personInfo:{
      screen:PersonInfo
    }
  },
  {
    headerMode: 'screen',
    swipeEnabled: true,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#151515'
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 15,
      },
      headerTintColor: '#fff'
    }
  }
);

export default Root;