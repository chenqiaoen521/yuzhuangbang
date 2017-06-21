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
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Platform,
    ScrollView,
} from 'react-native';
var {width,height} = Dimensions.get('window');


import Icon from 'react-native-vector-icons/FontAwesome';
import Notice from '../Components/Notice';

export default class AddFriendDetail extends Component {
    static navigationOptions = {
        title:'好友详情',
        headerRight: (
            <Icon.Button
                name="bell-o"
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.8}
                onPress={ () => {  navigation.state.params.handleShare(); } }
            />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ backgroundColor:'#151515',}}>
                    <Image source={require('./../imgs/friend_02.png')} style={{width:width,height:150,justifyContent:'center',alignItems:'center'}}>
                        <Image style={{width:70,height:70,borderRadius:35,}} source={require('./../imgs/friend_05.png')}></Image>
                        <Text style={{fontSize:16, color:'#cccccc',lineHeight:30}}>罗伯特</Text>
                        <Text style={{fontSize:12, color:'#858585',marginTop:3}}>15023645789</Text>
                    </Image>
                    </View>
                    <Notice bgcolor={'#f7f7f7'} titleColor={'#333'} rightBar={'#999'} />
                    <View style={styles.mbox}>
                    <View style={styles.mation}>
                        <Text style={styles.ltext}>账号信息</Text>
                        <Text style={styles.rtext}>13203839726</Text>
                    </View>
                    <View style={styles.mation}>
                        <Text style={styles.ltext}>性别</Text>
                        <Text style={styles.rtext}>女</Text>
                    </View>
                    <View style={styles.mation}>
                        <Text style={styles.ltext}>身份属性</Text>
                        <Text style={styles.rtext}>设计师</Text>
                    </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => this.GoAdd()}>
                    <View style={styles.add}><Text style={styles.addt}>添加好友</Text></View>
                </TouchableOpacity>

            </View>
        );
    }
    //
    GoAdd (){
        const {navigate} = this.props.navigation;
        navigate('AddFriendRequest') 
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f7f7f7',
    },
    ltext: {
        width:0.3*(width-30),
        fontSize:13,
        color:'#444'
    },
    rtext: {
        width:0.7*(width-30),
        color:'#bbb',
        textAlign:'right',
        fontSize:13,
    },
    add: {
        height:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ae8300',
    },
    addt: {
        color:'#fff',
        fontSize:14,
    },
    mation: {
        borderBottomWidth:1,
        borderColor:'#eee',
        backgroundColor:'#fff',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    mbox: {
        borderTopWidth:1,
        borderColor:'#eee',

    }
    
    //adasdadsd
});
