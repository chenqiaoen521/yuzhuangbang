/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Platform,
    ScrollView,
    WebView,
    ListView
} from 'react-native';
var {width,height} = Dimensions.get('window');


import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import KehuList from '../Components/KehuList';

//获取公共域名
var url = require('../config.json').url
//弹窗信息
import ToastUtil from '../utils/ToastUtil'
//存储登录信息
import store from 'react-native-simple-store';

export default class Center extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <View style={{ width:width-80, borderBottomWidth:1, borderBottomColor:'#ae8300', flexDirection:'row', justifyContent:'space-between',
                    alignItems:'center', height:40, marginRight:10, paddingLeft:5, paddingRight:5, }} >

                <TextInput placeholderTextColor="#777" onChangeText={(text) => { navigation.state.params.Goset(text) }} 
                    placeholder='输入关键字' underlineColorAndroid="transparent" 
                    style={{ width:width-125, color:'#777', fontSize:15, textAlign:'left', padding:0, }} />

                <TouchableOpacity onPress={ ()=> { navigation.state.params.Gosou(); }}>
                <View style={{ width:40, height:24, borderRadius:3, marginTop:3, paddingLeft:5, justifyContent:'center',alignItems:'center'}}>
                    {/*<Icons.Button name="md-search" backgroundColor="transparent" underlayColor="transparent" 
                        activeOpacity={0.8} style={{padding:0}} />*/}
                    <Text style={{color:'#fff', fontSize:13, textAlign:'center',}}>搜索</Text>
                </View>

                </TouchableOpacity>

            </View>   
            
        )
    })


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            IsResult: false,      //单选内容
            word:null,
            onoff: true,
            empty:0,
            token:'',
        };
        
    }
    render() {
        var that = this
        return (
            <View style={styles.container}>
                {/*<ScrollView>
                    {
                    that.state.IsResult == false ?
                    <TouchableOpacity >
                    <View style={{width:width}}>
                        <Image resizeMode={'center'} style={[styles.bmid,{ width:width},{ marginTop:80}]} source={require('./../imgs/bgtext_03.png')}>
                            <Text style={styles.etext}>输入搜索指定客户以及信息</Text>
                        </Image>
                    </View>
                    </TouchableOpacity>
                    : null }
                    <KehuList ref='zujian' popToWatch={ ()=> that.Goxq() } />
                    
                </ScrollView>  */}
                {this.state.empty==1 ?
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
                : null  }  
            </View>
        );
    }
    Goxq (){
        /*const {navigate} = this.props.navigation;
        navigate('Kehu',{page:'xq',title:'客户详情'});*/
    }

    componentDidMount() {
        var that = this;
        that.props.navigation.setParams({ 
            Gosou: ()=>that.Gofind() ,
            Goset: (text)=>that.Gokey(text),
            Goback:()=>that.Doback()
        });
        //navigation.state.params.Gosou();
        
    }

    Doback() {
        const {navigate} = this.props.navigation;
        navigate('CenterPT');
    }

    Gofind() {            
        var that = this
        if(!that.state.word){
            ToastUtil.showShort('关键字不能为空');
        }else{
            this.setState({ IsResult:true }); 
            //that.refs.zujian.Dofinds(that.state.word)
            that.Dofinds(that.state.word)
        }
    }
    Dofinds(word) {
        var that = this
        store.get('user').then(
            function(data){
                that.setState({
                    empty:1,
                    htmlsrc:`${url}/App/Role/contact_list?token=${data.token}&key=${word}`
                });  
                console.log(that.state.empty+'和'+that.state.htmlsrc)   
            })
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

    Gokey(text) {
        this.setState({ word:text });    
    }

}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#151515',
    },
    bmid: {
        alignItems:'center',
        justifyContent:'center',
    },
    etext: {
        fontSize:15,
        color:'#999',
    },
    WebView: {
        flex:1
    }
    
    
    
});
