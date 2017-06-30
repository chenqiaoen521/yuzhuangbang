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

export default class CreatShopWait extends Component {
    static navigationOptions = {
        title:'我要开店',
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
                    <View style={{padding:15,alignItems:'center',tejustifyContent:'center'}}>
                        <Text style={{fontSize:15, color:'#fff', textAlign:'center',lineHeight:30}}>您提交的商户信息正在审核中…{'\n'}请您耐心等待</Text>
                    </View>
                </Image>
            </View>
        );
    }
    //跳转
    Gocreat(num) {
        const {navigate} = this.props.navigation;
        navigate('CenterPT')
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
