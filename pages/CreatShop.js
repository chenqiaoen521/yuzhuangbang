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

export default class Center extends Component {
    static navigationOptions = {
        headerTitle:'我要开店',
        headerRight: (<View></View>),
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={{ width:width, height:height,}} resizeMode="stretch" source={require('./../imgs/shenfen_02.jpg')}>
                    <TouchableOpacity onPress={()=> this.Gocreat(1)}>
                    <View style={styles.circle}>
                        <Image style={styles.bgtu}  source={require('./../imgs/openbg_03.png')}>
                            <Image style={styles.bgtu}  source={require('./../imgs/opentbg_03.png')}>
                                <View style={styles.center}>
                                    <Text style={styles.text}>我是</Text>
                                    <Text style={styles.text}>商户</Text>
                                </View>
                            </Image>
                        </Image>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.Gocreat(2)}>
                    <View style={styles.circle}>
                        <Image style={styles.bgtu}  source={require('./../imgs/openbg_06.png')}>
                            <Image style={styles.bgtu}  source={require('./../imgs/opentbg_06.png')}>
                                <View style={styles.center}>
                                    <Text style={styles.text}>我是</Text>
                                    <Text style={styles.text}>设计单位</Text>
                                </View>
                            </Image>
                        </Image>
                    </View>          
                    </TouchableOpacity>
                </Image>
            </View>
        );
    }
    //跳转
    Gocreat(num) {
        const {navigate} = this.props.navigation;
        if(num===1){
            navigate('CreatShopSenda')
        }else{
            navigate('CreatShopSendb')
        }
    }
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    circle: {
        alignItems:'center',
        justifyContent:'center',
        marginTop:30,

    },
    text: {
        fontSize:18,
        color:'#fff',
    },
    center: {
        alignItems:'center',
        justifyContent:'center',
        height:width*0.54
    },
    bgtu: {
        width:width*0.54,
        height:width*0.54
    }
    
});
