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


export default class KehuNews extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '加入黑名单',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="mineicon" size={25} color={tintColor} style={{marginTop:1.5}}/>
        ),
        headerRight: (
            <Ionicons.Button name="md-share" backgroundColor="transparent" underlayColor="transparent" activeOpacity={0.8}
            onPress={ () => { navigation.state.params.handleShare(); } } />
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
    }
    onActionSelected () {
        const {navigate} = this.props.navigation;
        navigate('Message');
    }

    render() {
        const {state} = this.props.navigation;
        let page = state.params.url;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri:`${url}${page}`}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scalesPageToFit={false} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
    },
});
