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
} from 'react-native';
var {width,height} = Dimensions.get('window');

import Icon from 'react-native-vector-icons/FontAwesome';

import AddFriendList from '../Components/AddFriendList';


export default class Center extends Component {
    static navigationOptions = {
        title:'添加好友',
        headerRight: (
            <Icon.Button
                name="bell-o"
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.8}
                onPress={() => {
                    navigation.state.params.handleShare();
                }}
            />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchbox}>
                    <Icon style={{width:0.1*width}} name="search" size={23} color='#888'  />
                    <TextInput style={styles.rtext} placeholderTextColor="#bbb"  underlineColorAndroid="transparent" placeholder='输入对方账号进行查找' >
                    </TextInput>
                </View>
                <AddFriendList  popToWatch={()=>this.Goknow()}  />
            </View>
        );
    }
    //跳转
    Goknow() {
        const {navigate} = this.props.navigation;
        navigate('AddFriendDetail') 
        
    }
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#151515',
    },
    searchbox: {
        backgroundColor:'#1b1b1b',
        paddingTop:6,
        paddingRight:15,
        paddingBottom:6,
        paddingLeft:15,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#333',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    rtext: {
        width:0.9*width,
        color:'#bbb',
        paddingLeft:0,
        height:36,
    }
    
    
});
