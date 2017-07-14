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
import Icons from 'react-native-vector-icons/Ionicons';

//获取公共域名
var url = require('../config.json').url
//弹窗信息
import ToastUtil from '../utils/ToastUtil'
//存储登录信息
import store from 'react-native-simple-store';


export default class MyClient extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
        tabBarIcon: ({ tintColor }) => (
            <Icon name="mineicon" size={25} color={tintColor} style={{marginTop:1.5}}/>
        ),
        headerRight: (
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icons.Button name="ios-add" backgroundColor="transparent" underlayColor="transparent" size={30} activeOpacity={0.8}
                onPress={() => { navigation.navigate('KehuAdd');} } />
                <Icons.Button name="md-search" backgroundColor="transparent" underlayColor="transparent" activeOpacity={0.8}
                onPress={ () => { navigation.navigate('KehuSearch'); } } />
            </View>
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
                    htmlsrc:`${url}/App/Role/contact_list?token=${data.token}`,
                }); 
            }else{
                that.setState({
                    htmlsrc:`${url}/App/Role/contact_list`,
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
            <View style={styles.container}>
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
            </View>
        );
    }

    receiveMessage (e) {
        let message = e.nativeEvent.data;
        const {navigate} = this.props.navigation;
        console.log(message)
        if(message.indexOf('defriend')>0){
            console.log('去拉黑')
            //去拉黑
            navigate('KehuNews',{url:message});
        }else{
            console.log('你去说一句吧')
            let temp = message.split(",");
            //你去说一句吧
            navigate('ClientAdd',{id:temp[1]});
        }
        
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
    },
});
