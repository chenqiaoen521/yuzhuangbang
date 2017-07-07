

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
            dataSource:ds
        };
    }
    static defaultProps = {
        popToWatch: null,
        data:[]
    }

    renderMovieList(rowData) {
        return (
            <TouchableOpacity TouchableOpacity={0.5} onPress={()=>this.popToHome()}  >
            <View style={styles.sg}>
                <Text style={styles.sgName} numberOfLines={1}>{rowData.title}</Text>
                <Icon style={styles.icn} name="angle-right" size={23} color="#636363" />
            </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.sglist}>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.props.data)}
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
        paddingLeft:10,
        paddingRight:10,
        flexDirection:'row',
        backgroundColor:'#1b1b1b',
        borderBottomWidth:1,
        borderColor:'#151515',
        justifyContent:'space-between',
        alignItems:'center',
    },  
    sgName: {
        fontFamily:'Helvetica Neue',
        fontWeight:'300',
        color:'#999',
        width:(width-20)*0.9,
        overflow:'hidden',
        fontSize:13,
        justifyContent:'center',
    },
    icn: {
        
    }
});

