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
    TextInput,
    Dimensions,
    TouchableOpacity
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
export default class Search extends Component {
    static defaultProps = {
        popToHome: null
    }
    render() {
        return (
            <TouchableOpacity TouchableOpacity={0.5} onPress={()=>this.toSearch()}>
                <View style={styles.hsearch}>
                <View style={styles.container}>
                    <Text style={styles.inputStyle}>输入你想搜索的内容</Text>
                    <Icon style={styles.iconStyle} name="ios-search-outline" size={25}  />
                </View>
                </View>
            </TouchableOpacity>
        );
    }
    toSearch () {
        if(this.props.popToHome){
            this.props.popToHome()
        }
    }
}

const styles = StyleSheet.create({
    hsearch: {
        backgroundColor:'#1b1b1b',
        padding:15
    },
    container: {
        flexDirection:'row',
        justifyContent :'center',
        backgroundColor:'#262626',
        borderRadius:25,
        width:width*0.93,
        height:34,
        alignItems:'center',
        borderColor:'#353535',
    },
        inputStyle:{
        width:width*0.8,
        fontSize:12,
        color:'#5c5c5c',
        marginLeft:10
    },
    iconStyle:{
        marginRight:10,
        color:'#b0b0b0',
    }
});

