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
import CenterPT  from './pages/center_putong';
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
import AddFriend  from './pages/AddFriend';
import AddFriendDetail  from './pages/AddFriendDetail';

import WorkManage  from './pages/WorkManage';
import CreatShop  from './pages/CreatShop';
import CreatShopSenda  from './pages/CreatShopSenda';
import CreatShopSendb  from './pages/CreatShopSendb';
import CreatShopWait  from './pages/CreatShopWait';
import AddFriendRequest  from './pages/AddFriendRequest';
import Kehu  from './pages/Kehu';
import KehuAdd  from './pages/KehuAdd';
import KehuSearch  from './pages/KehuSearch';
import ChangePhone  from './pages/ChangePhone';
import MyBlack  from './pages/myblack';

import AddressPage  from './pages/address';
import DetailAddr  from './pages/detailAddr';
import MessageFriend  from './pages/messageFriend';

import { Button, View, Text, } from 'react-native';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';


const Root = StackNavigator(
  { 
    Main:{
        screen: Main 
    },
    Splash:{
        screen:Splash
    },
    AddFriendRequest:{
        screen:AddFriendRequest
    },
    myBlack:{
        screen:MyBlack
    }, 
    Kehu:{
        screen:Kehu
    },
    KehuAdd:{
        screen:KehuAdd
    },
    KehuSearch:{
        screen:KehuSearch
    },
    ChangePhone:{
        screen:ChangePhone
    },
    CreatShop:{
        screen:CreatShop
    },
    CreatShopWait:{
        screen:CreatShopWait
    },
    CreatShopSenda:{
        screen:CreatShopSenda
    },
    CreatShopSendb:{
        screen:CreatShopSendb
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
    },
    Center:{
      screen:Center
    },
    CenterPT:{
      screen:CenterPT
    }


    },
    {
        headerMode: 'screen',
        swipeEnabled: true,
        navigationOptions: {
            headerStyle:{
                backgroundColor:'#151515',
                height:56,
                paddingTop:10,
                justifyContent:'center',
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 15,
                alignSelf:'center',
            },
            headerTintColor: '#fff'

        }
    }
);

export default Root;