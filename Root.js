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
import BlackList  from './pages/blackList';
import Feedback  from './pages/Feedback';
import Message  from './pages/Message';
import About  from './pages/About';
import PasswordPage  from './pages/Password';
import ForgetPassword  from './pages/ForgetPassword';
import Account  from './pages/account';
import AccountAdd  from './pages/account-add';
import Icare  from './pages/Icare';
import AddFriend  from './pages/addFriend';
import AddFriendDetail  from './pages/addFriendDetail';

import WorkManage  from './pages/WorkManage';
import CreatShop  from './pages/CreatShop';
import CreatShopSenda  from './pages/CreatShopSenda';
/*import RNCarousel  from './Components/RNCarousel';*/

import AddressPage  from './pages/address';
import DetailAddr  from './pages/detailAddr';
import MessageFriend  from './pages/messageFriend';


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
    MainDetail:{
      screen:MainDetail,
    },
    addFriend:{
      screen:AddFriend,
    },
    addFriendDetail:{
      screen:AddFriendDetail,
    },
    Message:{
      screen:Message,
    },
    account:{
      screen:Account,
    },
    accountAdd:{
      screen:AccountAdd,
    },
    detailAddr:{
      screen:DetailAddr,
    },
    Icare:{
      screen:Icare,
    },
    blackList:{
      screen:BlackList,
    },
    Feedback:{
      screen:Feedback,
    },
    messageFriend:{
      screen:MessageFriend,
    },
    password:{
      screen:PasswordPage,
    },
    address:{
      screen:AddressPage,
    },
    About:{
      screen:About,
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
            alignSelf:'center'
          },
          headerTintColor: '#fff'
        }
    }
);

export default Root;