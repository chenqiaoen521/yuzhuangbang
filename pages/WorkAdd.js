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


export default class WorkAdd extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
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
        var that = this
        store.get('user').then(function(data){
            if(data.token){
                that.setState({
                    htmlsrc:`${url}/App/Role/work_detail?token=${data.token}`,
                }); 
            }else{
                that.setState({
                    htmlsrc:`${url}/App/Role/work_detail`,
                }); 
            }
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
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scalesPageToFit={false} />
            </ScrollView>
        );
    }
    
    renderHeader () {
        return (
            <View>
                <Image style={{width:width,height:160}} source={require('../imgs/indeximg_02.jpg')}/>
                <View style={{position:'absolute',justifyContent :'center',alignItems:'flex-end',bottom:0,
                    width:width,backgroundColor:'rgba(0,0,0,0.3)',height:34}}>
                    <Text style={{color:'#fff',fontSize:12,marginRight:10}}>移动互联网时代的家装风格能力创新</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
    },
});
