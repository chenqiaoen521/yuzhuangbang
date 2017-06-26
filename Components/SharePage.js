

import React, { Component } from 'react';
import { AppRegistry, ListView, Text, Image, View, StyleSheet, TouchableOpacity,TextInput, Dimensions } from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';

var {width,height} = Dimensions.get('window');
export default class LoginPage  extends Component {


    render() {
        return (
            <View style={styles.share}>
                <View style={styles.tit}><Text style={styles.titext}>分享至</Text></View>
                <View style={styles.list}>
                    <TouchableOpacity>
                        <View style={styles.sg}>
                            <Image style={styles.sgimg} source={require('./../imgs/shareicon_03.png')}></Image>
                            <Text style={styles.sgtext}>朋友圈</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.sg}>
                            <Image style={styles.sgimg} source={require('./../imgs/shareicon_05.png')}></Image>
                            <Text style={styles.sgtext}>微信好友</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.sg}>
                            <Image style={styles.sgimg} source={require('./../imgs/shareicon_07.png')}></Image>
                            <Text style={styles.sgtext}>QQ好友</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.sg}>
                            <Image style={styles.sgimg} source={require('./../imgs/shareicon_09.png')}></Image>
                            <Text style={styles.sgtext}>QQ空间</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.sg}>
                            <Image style={styles.sgimg} source={require('./../imgs/shareicon_11.png')}></Image>
                            <Text style={styles.sgtext}>微博</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity><View style={styles.cancle}><Text style={styles.ctext}>取消</Text></View></TouchableOpacity>
            </View>
        );
    }

    
}




const styles = StyleSheet.create({
    share: {
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor: '#fff',
    },
    tit: {
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        paddingTop:10,
        paddingBottom:10,
        width:width,
    },
    titext: {
        fontSize:16,
        color:'#555',
    },
    cancle: {
        justifyContent:'center',
        alignItems:'center',
        borderTopWidth:1,
        borderTopColor:'#eee',
        paddingTop:12,
        paddingBottom:12,
        width:width,
    },
    ctext: {
        fontSize:15,
        color:'#999'
    },
    list: {
        flexDirection:'row',
        paddingBottom:20,
        paddingTop:20,
        paddingLeft:15,
        paddingRight:15,
        justifyContent:'space-between'
    },
    sg: {
        alignItems:'center',
        justifyContent:'center',
    },
    sgimg: {
        width:(width-30)*0.14,
        height:(width-30)*0.14,
        borderRadius:50,
        marginBottom:5,
    },
    sgtext: {
        fontSize:13,
        color:'#777'
    }
    
});

