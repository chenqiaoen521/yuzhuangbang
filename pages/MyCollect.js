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
    Image,
    Dimensions,
    WebView,
    Alert
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Wz';
import IconDetail from '../Components/IconDetail';
import Ionicons from 'react-native-vector-icons/Ionicons';

//获取公共域名
var url = require('../config.json').url
//弹窗信息
import ToastUtil from '../utils/ToastUtil'
//存储登录信息
import store from 'react-native-simple-store';


export default class MyCollect extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
        headerRight: (<View></View>),
        tabBarIcon: ({ tintColor }) => (
            <Icon name="mineicon" size={25} color={tintColor} style={{marginTop:1.5}}/>
        )
    });

    // 构造
    constructor(props) {
        super(props);
        var that = this;
        // 初始状态
        this.state = {
            htmlsrc:'https://m.facebook.com',
        };
    }
 
    componentDidMount() {
        this.props.navigation.setParams({ handleShare: ()=>this.onActionSelected() });
        var that = this
        store.get('user').then(function(data){
            if(data.token){
                that.setState({
                    htmlsrc:`${url}/App/Center/my_collect?token=${data.token}&type=3`,
                }); 
            }else{
                that.setState({
                    htmlsrc:`${url}/App/Center/my_collect?type=3`,
                }); 
            }
            console.log(that.state.htmlsrc)
        })
    }
    onActionSelected () {
        const {navigate} = this.props.navigation;
        navigate('Message');
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri:this.state.htmlsrc}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onMessage={this.receiveMessage.bind(this)}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scalesPageToFit={false} />
            </ScrollView>
        );
    }

    receiveMessage (e) {
        let message = e.nativeEvent.data
        console.log(message)
        const {navigate} = this.props.navigation;
        navigate('WorkDetail',{url:message})
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
    },
});
