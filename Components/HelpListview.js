

import React, { Component } from 'react';
import { AppRegistry, ListView, Text, Image, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';

var {width,height} = Dimensions.get('window');
export default class HelpListview  extends Component {
    // 初始化模拟数据
    constructor(props) {
        super(props);
        //对比数据
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                {"title":'世界上有三种东西是掩盖不了的,咳嗽,贫穷和爱情'},
                {"title":'天下没有免费的午餐，你别想得太好了'},
                {"title":'开什么玩笑，任何事情都是有代价的'},
                {"title":'我的生活就像是在白夜里行走'},
                {"title":'愿有人与你共黄昏，有人问你粥可温'},
                {"title":'你站在桥上看风景，看风景的人在楼上看你'},
                {"title":'世上有两样东西不可直视，一是太阳，二是人心。'},       
            ])
        };
    }
    static defaultProps = {
        popToWatch: null
    }

    renderMovieList(rowData) {
        return (
            <TouchableOpacity TouchableOpacity={0.5} onPress={()=>this.popToHome()}  >
            <View style={styles.sg}>
                <Text style={styles.sgName} numberOfLines={1}>{rowData.title}</Text>
                <Icon style={styles.icn} name="angle-right" size={25} color="#636363" />
            </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.sglist}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovieList.bind(this)}
                />
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

    },
    sg: {
        flex: 1,
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:15,
        paddingRight:15,
        flexDirection:'row',
        backgroundColor:'#1b1b1b',
        borderBottomWidth:1,
        borderColor:'#151515',
        justifyContent:'space-between'
    },  
    sgName: {
        fontSize:18,
        fontFamily:'Helvetica Neue',
        fontWeight:'300',
        color:'#999',
        width:width*0.8,
        overflow:'hidden',
        fontSize:15,
        alignItems:'center',
        justifyContent:'center'
    },
    icn: {
        marginLeft:width*0.03,
    }
});

