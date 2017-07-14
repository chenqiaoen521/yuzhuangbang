/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Main  from './pages/Main';
import Init  from './pages/init';
import FindLG  from './pages/FindLG';
import FindYP  from './pages/FindYP';
import Center  from './pages/Center';
import CenterPT  from './pages/center_putong';
import Splash from './pages/Splash';
import SearchPage from './pages/SearchPage';
import SearchDetail from './pages/Search';
import MainDetail  from './pages/MainDetail';
import Settings  from './pages/Settings';
import PersonInfo  from './pages/PersonInfo';
import HelpCenter  from './pages/HelpCenter';
import HelpDetail  from './pages/HelpDetail';
import BlackList  from './pages/blackList';
import Feedback  from './pages/Feedback';
import Message  from './pages/Message';
import ClientAdd  from './pages/ClientAdd';
import About  from './pages/About';
import PasswordPage  from './pages/Password';
import ForgetPassword  from './pages/ForgetPassword';
import Account  from './pages/account';
import AccountAdd  from './pages/account-add';
import Icare  from './pages/Icare';
import AddFriend  from './pages/AddFriend';
import AddFriendDetail  from './pages/AddFriendDetail';

/**H5**/
import WorkDetail  from './pages/WorkDetail';
import WorkAdd  from './pages/WorkAdd';
import MyHome  from './pages/MyHome';
import MyHomeOther  from './pages/MyHomeOther';
import MyCollect  from './pages/MyCollect';
import MyBranch  from './pages/MyBranch';
import MyClient  from './pages/MyClient';
import KehuNews  from './pages/KehuNews';
import WorkAddEdit  from './pages/WorkAddEdit';
/**H5**/
import AccountEdit  from './pages/AccountEdit';

import WorkManage  from './pages/WorkManage';
import CreatShop  from './pages/CreatShop';
import CreatShopSenda  from './pages/CreatShopSenda';
import CreatShopSendb  from './pages/CreatShopSendb';
import CreatShopWait  from './pages/CreatShopWait';
import AddFriendRequest  from './pages/AddFriendRequest';
import AddFriendAlready  from './pages/addFriendAlready';
import Kehu  from './pages/Kehu';
import KehuAdd  from './pages/KehuAdd';
import KehuSearch  from './pages/KehuSearch';
import ChangePhone  from './pages/ChangePhone';
import MyBlack  from './pages/myblack';

import AddressPage  from './pages/address';
import DetailAddr  from './pages/detailAddr';
import MessageFriend  from './pages/messageFriend';

import { Button, View, Text, Platform } from 'react-native';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';


const Root = StackNavigator(
    {   
        Init:{screen:Init },
        CreatShopSenda:{ screen:CreatShopSenda },
        Main:{ screen: Main },
        ClientAdd:{screen:ClientAdd },
        //Main:{ screen: Main },
        Splash:{screen:Splash },
        AddFriendRequest:{ screen:AddFriendRequest },
        myBlack:{ screen:MyBlack }, 
        SearchDetail:{ screen:SearchDetail }, 
        Kehu:{ screen:Kehu },
        KehuAdd:{ screen:KehuAdd },
        AddFriendAlready:{ screen:AddFriendAlready },
        KehuSearch:{ screen:KehuSearch },
        ChangePhone:{ screen:ChangePhone },
        CreatShop:{ screen:CreatShop },
        CreatShopWait:{ screen:CreatShopWait },
        CreatShopSendb:{ screen:CreatShopSendb },  
        WorkManage:{ screen:WorkManage },
        MainDetail:{ screen:MainDetail },
        addFriend:{ screen:AddFriend },
        addFriendDetail:{screen:AddFriendDetail },
        Message:{ screen:Message },
        account:{ screen:Account },
        accountAdd:{ screen:AccountAdd },
        detailAddr:{ screen:DetailAddr },
        Icare:{ screen:Icare },
        blackList:{ screen:BlackList },
        Feedback:{ screen:Feedback },
        messageFriend:{ screen:MessageFriend },
        password:{ screen:PasswordPage },
        address:{ screen:AddressPage },
        About:{ screen:About },
        SearchPage:{ screen:SearchPage },
        Settings:{ screen:Settings },
        personInfo:{ screen:PersonInfo },
        HelpCenter:{ screen:HelpCenter },
        HelpDetail:{ screen:HelpDetail },
        ForgetPassword:{ screen:ForgetPassword },
        Center:{ screen:Center },
        CenterPT:{ screen:CenterPT },
        WorkDetail:{ screen:WorkDetail },
        WorkAdd:{ screen:WorkAdd },
        MyHome:{ screen:MyHome },
        MyCollect:{ screen:MyCollect },
        MyHomeOther:{ screen:MyHomeOther },
        MyBranch:{ screen:MyBranch },
        MyClient:{ screen:MyClient },
        KehuNews:{ screen:KehuNews },
        AccountEdit:{ screen:AccountEdit },
        WorkAddEdit:{ screen:WorkAddEdit },

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