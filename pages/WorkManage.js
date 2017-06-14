/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import FacebookTabBar from './FacebookTabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import WorkManageOne from '../Components/WorkManageOne'


var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

export default class WorkManage extends Component {
    static navigationOptions = {
        title:'作品管理',
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
                <ScrollableTabView
                    initialPage={1}
                    renderTabBar={() => <FacebookTabBar />}
                >
                    <ScrollView tabLabel="ios-paper" style={styles.tabView}>
                        {/*<TouchableOpacity >
                        <View style={styles.sin}>
                            <TouchableOpacity>
                                <Image style={{width:width*0.2, height:width*0.2}} source={require('./../imgs/indeximg_07.jpg')}></Image>
                            </TouchableOpacity>
                            <View style={styles.sinmid}>
                                <TouchableOpacity>
                                    <View style={styles.sinText}>
                                        <Image style={{width:14, height:14,marginRight:4,marginTop:3,alignSelf:'flex-start'}} source={require('./../imgs/detailicon_36.png')}></Image>
                                        <Text style={{fontSize:13,width:width*0.5-18,color:'#fff'}} numberOfLines={2}>简约清新小户型一居室的好房子啊</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.sinbtn}>
                                    <TouchableOpacity>
                                        <View style={styles.sbtn}>
                                            <Icon size={14} color="#898989" name="edit"></Icon>
                                            <Text style={{fontSize:11,color:'#898989',marginLeft:2}}>编辑</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={styles.sbtn}>
                                            <Icon size={14} color="#898989" name="trash-o"></Icon>
                                            <Text style={{fontSize:11,color:'#898989',marginLeft:2}}>删除</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>  
                            </View>
                            <TouchableOpacity>
                                <View style={styles.sinTai}>
                                    <Text style={{fontSize:12,color:'#999999'}}>未发布</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        </TouchableOpacity>*/}
                        <WorkManageOne />
                    </ScrollView>
                    <ScrollView tabLabel="ios-people" style={styles.tabView}>
                        <WorkManageOne />
                    </ScrollView>
                    <ScrollView tabLabel="ios-chatboxes" style={styles.tabView}>
                        <WorkManageOne />
                    </ScrollView>
                    
                </ScrollableTabView>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingTop:10, paddingBottom:10,backgroundColor:'#ae8300',}}>
                    <Image style={{width:12,height:12,marginRight:5,}} source={require('./../imgs/addicon.png')}></Image>
                    <Text style={{ fontSize:14, color:'#fff',}}>添加作品</Text>
                </View>
            </View>
        );
    }    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#151515'
    },
    tabView: {
        paddingBottom:8,
    },
    sin: {
        backgroundColor: '#1b1b1b',
        marginTop:8,
        padding:(width*0.02),
        flexDirection:'row'
    },  
    sinmid: {
        width:width*0.50,
        marginLeft:width*0.03,
        marginRight:width*0.03, 
    },
    sinText: {
        flexDirection:'row',
        paddingTop:3,
        width:width*0.50,
        alignItems:'center'
    },
    sinbtn: {      
        flexDirection:'row',
        height:20, 
        width:width*0.50,
        paddingTop:6
    },
    sbtn:{
        flexDirection:'row',
        marginRight:10,
        alignItems:'center',    

    },
    sinTai: {
        width:width*0.2,
        alignItems:'center',
        justifyContent:'center',
        height:width*0.2
    }
});
