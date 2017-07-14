

import React, { Component } from 'react';
import { AppRegistry, ListView, Text, Image, View, StyleSheet, TouchableOpacity, Dimensions, WebView, ScrollView } from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';

//获取公共域名
var url = require('../config.json').url
//弹窗信息
import ToastUtil from '../utils/ToastUtil'
//存储登录信息
import store from 'react-native-simple-store';

var {width,height} = Dimensions.get('window');
export default class KehuList  extends Component {
    
    // 初始化模拟数据
    constructor(props) {
        super(props);
        //对比数据
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds
            /*.cloneWithRows([
                {"name":'王女士 ','img':require('../imgs/detailicon_14.png'),'number':13253421545,'tip':'接触中'},
                {"name":'陈先生 ','img':require('../imgs/friend_05.png'),'number':12353426987,'tip':'已收定'},
                {"name":'马先生 ','img':require('../imgs/goods_04.jpg'),'number':12354642578,'tip':'设计中'},
                {"name":'金女士 ','img':require('../imgs/pro_02.png'),'number':15687945324,'tip':'施工中'},
                {"name":'宇文先生 ','img':require('../imgs/dlicon01.png'),'number':15468793245,'tip':'已竣工'},
                {"name":'王女士 ','img':require('../imgs/detailicon_14.png'),'number':13253421545,'tip':'未装修'},
                {"name":'陈先生 ','img':require('../imgs/friend_05.png'),'number':12353426987,'tip':'售后'},
                {"name":'王女士 ','img':require('../imgs/detailicon_14.png'),'number':13253421545,'tip':'接触中'},
                {"name":'陈先生 ','img':require('../imgs/friend_05.png'),'number':12353426987,'tip':'已收定'},
                {"name":'马先生 ','img':require('../imgs/goods_04.jpg'),'number':12354642578,'tip':'设计中'},
                {"name":'金女士 ','img':require('../imgs/pro_02.png'),'number':15687945324,'tip':'施工中'},
                {"name":'宇文先生 ','img':require('../imgs/dlicon01.png'),'number':15468793245,'tip':'已竣工'},
                {"name":'王女士 ','img':require('../imgs/detailicon_14.png'),'number':13253421545,'tip':'未装修'},
                {"name":'陈先生 ','img':require('../imgs/friend_05.png'),'number':12353426987,'tip':'售后'},
            ])*/,           
            onoff: true,
            empty:0,
            htmlsrc:'https://m.facebook.com'
        };
    }
    
    static defaultProps = {
        popToWatch: null,
    }

    renderMovieList(rowData) {
        return (
            <TouchableOpacity TouchableOpacity={0.5} onPress={()=>this.popToHome()}  >
            <View style={styles.sg}>
                <View style={styles.sgimgb}>
                    <Image style={styles.sgimg} source={rowData.img}  source={{uri:`${url}${rowData.avatar}`}}></Image>
                </View>
                <Text style={styles.sgName} numberOfLines={1}>
                    {rowData.contact_name}
                    <Text style={{color:'#666',paddingLeft:6}}>{rowData.phone}</Text>
                </Text>
                {/*<Text style={styles.sgtip}>{rowData.tip}</Text>*/}
            </View>
            </TouchableOpacity>
        )
    }



    render() {
        return (
            <View style={styles.container}>
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
    popToHome () {
        if(this.props.popToWatch){
            this.props.popToWatch()
        }
    }

    receiveMessage (e) {
        let message = e.nativeEvent.data;
        let temp = message.split(",");
        //你去说一句吧
        const {navigate} = this.props.navigation;
        navigate('ClientAdd',{id:temp[1]});
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
    /*async dfinds(token,name){
        var that = this
        if(!name){
            //ToastUtil.showShort('关键字不能为空')
        }
        else{
            try {
                //let response = await fetch(`${url}/App/Role/search_contact?token=${token}&name=${name}`,{
                let response = await fetch(`${url}/App/Role/contact_list?token=${token}&key=${name}`,{
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });
                let responseJson = await response.json();
                console.log(response)
                if(responseJson.errorCode===0){
                    console.log(responseJson.data)
                    if(responseJson.data.length==0){
                        that.setState({ empty:-1 }); 
                    }else{
                        that.setState({
                            empty:1,
                            //dataSource:that.state.dataSource.cloneWithRows(responseJson.data)
                            htmlsrc:`${url}${responseJson.data}`
                        }); 
                    }   
                    console.log(responseJson)
                    return responseJson;
                }else{
                    console.log(responseJson)
                    ToastUtil.showShort(responseJson.errorMsg,true)
                }
            } catch(error) {
                console.error(error);
                ToastUtil.showShort(error,true)
            }
        }
    }*/
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
    },
    sglist: {
        paddingTop:10,
        paddingBottom:10,
        flex:1,
    },
    sg: {
        flex: 1,
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:12,
        paddingRight:12,
        flexDirection:'row',
        backgroundColor:'#1b1b1b',
        borderBottomWidth:1,
        borderColor:'#151515',
        justifyContent:'space-between',
        alignItems:'center'
    },  
    sgName: {
        fontSize:18,
        fontFamily:'Helvetica Neue',
        fontWeight:'300',
        color:'#aaa',
        width:(width-74),
        overflow:'hidden',
        fontSize:14,
        alignItems:'center',
        justifyContent:'center',
    },
    sgimg: {
        width:36,
        height:36,
        backgroundColor:'#fff',
    },
    sgimgb: {
        width:36,
        height:36,
        backgroundColor:'#fff',
        borderRadius:18,
        marginRight:14,
        overflow:'hidden'
    },
    sgtip: {
        width:(width-74)*0.2,
        backgroundColor:'#ae8300',
        color:'#fff',
        fontSize:12,
        paddingTop:2,
        paddingBottom:2,
        textAlign:'center',
        borderRadius:3
    },
    webView: {
        height:height,
    }

});

