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

export default class Center extends Component {
    static navigationOptions = {
        title:'添加好友',
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
                    <View style={styles.xinxi}>
                        <Image style={{width:60,height:60,borderRadius:30,}} source={require('./../imgs/friend_05.png')}></Image>
                        <View style={{ height:60, width:width-100,}}>
                            <Text style={{fontSize:16, color:'#cccccc',lineHeight:30}}>罗伯特</Text>
                            <Text style={{fontSize:12, color:'#858585',marginTop:3}}>15023645789</Text>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.mt}>填写申请信息</Text>
                            <TextInput style={styles.minput} multiline={true} placeholderTextColor="#ccc" underlineColorAndroid="transparent" placeholder='我是东易力天装饰业务员小王' >
                            </TextInput>
                        </View>
                        <View>
                            <Text style={styles.mt}>备注</Text>
                            <TextInput style={styles.minput} multiline={true} placeholderTextColor="#ccc" underlineColorAndroid="transparent" placeholder='2.15客户' >
                            </TextInput>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity>
                    <View style={styles.add}><Text style={styles.addt}>发送</Text></View>
                </TouchableOpacity>

            </View>
        );
    }
    //
    GoAdd (){
        const {navigate} = this.props.navigation;
        //navigate('CreatShopWait') 
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#151515',
    },
    xinxi: {
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10
    },
    mt: {
        color:'#535353',
        fontSize:14,
        paddingTop:15,
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:5
    },
    minput: {
        backgroundColor:'#1b1b1b',
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:15,
        paddingRight:15,
        fontSize:13,
        color:'#ccc'
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
    
    
    
});
