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

import WorkManage  from './pages/WorkManage';
import CreatShop  from './pages/CreatShop';
import CreatShopSenda  from './pages/CreatShopSenda';
import CreatShopSendb  from './pages/CreatShopSendb';
import CreatShopWait  from './pages/CreatShopWait';
import AddFriend  from './pages/AddFriend';
import AddFriendDetail  from './pages/AddFriendDetail';
import AddFriendRequest  from './pages/AddFriendRequest';
/*import RNCarousel  from './Components/RNCarousel';*/

import AddressPage  from './pages/address';
import DetailAddr  from './pages/detailAddr';
import MessageFriend  from './pages/messageFriend';

import { Button, View, Text, } from 'react-native';
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
    },
});

const Root = StackNavigator(

  { 
    
    Index: {
        screen: TabContainer,
        /*navigationOptions: {
            headerLeft: null,
            //
            headerStyle:{
                backgroundColor:'#151515',
            },
            headerTitleStyle: {
                color:'#fff',
                fontSize:16,
            }
        }*/
    },
    AddFriend:{
        screen:AddFriend
    },
    AddFriendDetail:{
        screen:AddFriendDetail
    },  
    AddFriendRequest:{
        screen:AddFriendRequest
    }, 
    Splash:{
        screen:Splash
    },
    CreatShop:{
        screen:CreatShop
    },
    CreatShopWait:{
        screen:CreatShopWait
    },
    CreatShopSendb:{
        screen:CreatShopSendb
    },  
    CreatShopSenda:{
        screen:CreatShopSenda
    },
    WorkManage:{
        screen:WorkManage
    },
    MainDetail:{
      screen:MainDetail,
    },
    Message:{
      screen:Message,
    },
    detailAddr:{
      screen:DetailAddr,
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
            /*headerStyle: {
                backgroundColor: '#151515'
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 15,
            },*/
            headerTintColor: '#fff',
            headerStyle:{
                backgroundColor:'#151515',
                height:56,
                paddingTop:10,
                justifyContent:'center'
            },
            headerTitleStyle: {
                color:'#fff',
                fontSize:16,
                textAlign:'center'
            }
        }
    }
);

export default Root;