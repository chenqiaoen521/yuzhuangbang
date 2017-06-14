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
import HelpCenter  from './pages/HelpCenter';
import HelpDetail  from './pages/HelpDetail';
import Message  from './pages/Message';
import ForgetPassword  from './pages/ForgetPassword';
import WorkManage  from './pages/WorkManage';
import CreatShop  from './pages/CreatShop';
import CreatShopSenda  from './pages/CreatShopSenda';
/*import RNCarousel  from './Components/RNCarousel';*/

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
        /*RNCarousel:{
            screen:RNCarousel
        },*/
        CreatShopSenda:{
            screen:CreatShopSenda
        },
        CreatShop:{
            screen:CreatShop
        },
        Index: {
            screen: TabContainer,
            navigationOptions: {
                headerLeft: null
            }
        },
        WorkManage:{
            screen:WorkManage
        },
        Splash:{
            screen:Splash
        },
        
        MainDetail:{
            screen:MainDetail,
        },
        Message:{
            screen:Message,
        },
        SearchPage:{
            screen:SearchPage
        },
        Settings:{
            screen:Settings
        },
        personInfo:{
            screen:PersonInfo
        },
        HelpCenter:{
            screen:HelpCenter
        },
        HelpDetail:{
            screen:HelpDetail
        },
        ForgetPassword:{
            screen:ForgetPassword
        },
        

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