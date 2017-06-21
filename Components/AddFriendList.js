

import React, { Component } from 'react';
import { AppRegistry, ListView, Text, Image, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';

var {width,height} = Dimensions.get('window');
export default class AddFriendList  extends Component {
    // 初始化模拟数据
    constructor(props) {
        super(props);
        //对比数据
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                {"name":'艾若溪河 ','img':require('../imgs/sendzheng_20.png'),'number':7532544454},
                {"name":'玛丽莲梦露 ','img':require('../imgs/sendzheng_24.png'),'number':7645812154},
                {"name":'玛丽莲梦露 ','img':require('../imgs/sendzheng_20.png'),'number':7532544454},
                {"name":'艾若溪河 ','img':require('../imgs/sendzheng_24.png'),'number':7532544454},
                {"name":'玛丽莲梦露 ','img':require('../imgs/sendzheng_20.png'),'number':7532544454},
                {"name":'艾若溪河 ','img':require('../imgs/sendzheng_24.png'),'number':7532544454},
                {"name":'玛丽莲梦露 ','img':require('../imgs/sendzheng_20.png'),'number':7532544454},
                {"name":'艾若溪河 ','img':require('../imgs/sendzheng_24.png'),'number':7532544454},
                {"name":'玛丽莲梦露 ','img':require('../imgs/sendzheng_20.png'),'number':7532544454},
                {"name":'艾若溪河 ','img':require('../imgs/sendzheng_24.png'),'number':7532544454},
                {"name":'玛丽莲梦露 ','img':require('../imgs/sendzheng_20.png'),'number':7532544454},
            ]),           
            onoff: true,
        };
    }
    static defaultProps = {
        popToWatch: null,
    }

    renderMovieList(rowData) {
        return (
            <TouchableOpacity TouchableOpacity={0.5} onPress={()=>this.popToHome()}  >

            <View style={styles.sg}>
                <Image style={styles.sgimg} source={rowData.img}></Image>
                <Text style={styles.sgName} numberOfLines={1}>
                    {rowData.name}
                    <Text style={{color:'#666'}}>({rowData.number})</Text>
                </Text>
            </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.sglist}>
                {/*{
                    this.state.onoff ? */}
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderMovieList.bind(this)}
                    />
                    {/*: <Text>false</Text>}*/}

            </View>
            
        );
    }
    popToHome () {
        if(this.props.popToWatch){
            this.props.popToWatch()
        }
    }
}




const styles = StyleSheet.create({
    sglist: {
        paddingTop:10,
        paddingBottom:10
    },
    sg: {
        flex: 1,
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:12,
        paddingRight:12,
        flexDirection:'row',
       /*backgroundColor:'#1b1b1b',
        borderBottomWidth:1,
        borderColor:'#151515',*/
        justifyContent:'space-between',
        alignItems:'center'
    },  
    sgName: {
        fontSize:18,
        fontFamily:'Helvetica Neue',
        fontWeight:'300',
        color:'#aaa',
        width:width-50,
        overflow:'hidden',
        fontSize:14,
        alignItems:'center',
        justifyContent:'center'
    },
    sgimg: {
        width:36,
        height:36,
        borderRadius:20,
        marginRight:14,
    }
});

