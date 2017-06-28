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
    TextInput,
    Button,
    Switch,
    Alert,
    ListView,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadingView from '../Components/LoadingView';
import * as blackCreators from '../actions/black';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
var url = require('../config.json').url;
var loadMoreTime = 0;
var pages = 0;
class BlackList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds
        };
    }
    static navigationOptions = {
        headerTitle:'黑名单',
        headerRight: (
            <Icon.Button name="bell-o" backgroundColor="transparent" underlayColor="transparent" activeOpacity={0.8}
              onPress={() => { navigation.state.params.handleShare(); }} />
        )
    }
    componentDidMount () {
        const {blackActions} = this.props;
        blackActions.requestBlackList(false,true,false)
        pages = 1;
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderContent()}
            </View>                                                   
        );
    }
    renderContent(){
        if(this.props.black.loading){
            return (
                <LoadingView/>
            )
        }else{
            return (
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.props.black.articleList)}
                    renderRow={(rowdata)=>this.renderRow(rowdata)}
                    contentContainerStyle={styles.contentViewStyle}
                    enableEmptySections={true}
                    initialListSize ={1}
                    onEndReached={() => this.onEndReached()}
                    onEndReachedThreshold ={10}
                    renderFooter={()=>this.renderFooter()}
                    refreshControl={
                        <RefreshControl  style={styles.refreshControlBase} refreshing={this.props.black.isRefreshing}
                            onRefresh={() => this.onRefresh()} title="Loading..." colors={['#ffaa66cc']} />
                    }
                />
            )
        }
    }
    onEndReached(){
        const time = Date.parse(new Date()) / 1000;
        if (time - loadMoreTime > 1) {
            const {blackActions} = this.props;
            pages = pages + 1 ;
            blackActions.requestBlackList(false,false,true,pages);
            loadMoreTime = Date.parse(new Date()) / 1000;
        }
    }
    onRefresh(){
        const {blackActions} = this.props;
        pages = 1;
        blackActions.requestBlackList(true,false,false,pages);
    }
    renderRow(rowdata){
        return (
            <TouchableOpacity style={styles.unit} >
                <View style={styles.up}>
                    <Image style={styles.img} source={{uri:`${url}/${rowdata.avatar}`}} />
                    <Text style={[styles.nameStyle,{fontSize:16}]}>{rowdata.contact_name}</Text>
                </View>
                <View style={styles.down}>
                    <Text style={styles.reason}>
                        <Text style={[styles.nameStyle,{fontSize:11}]}>拉黑原因  :  </Text>
                        {rowdata.reason}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    renderFooter(){
        if(this.props.black.isLoadMore){
            return (
                <View style={styles.footerContainer}>
                    <ActivityIndicator size="small" color="#ffb14c" />
                    <Text style={styles.footerText}> 数据加载中…… </Text>
                </View>
            );
        }else{
            return ( <View/> )
        }
    }
}

const mapStateToProps = (state) => {
    const { black } = state;
    return {
        black
    };
};

const mapDispatchToProps = (dispatch) => {
    const blackActions = bindActionCreators(blackCreators, dispatch);
    return {
        blackActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlackList);

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#151515',
    },
    unit:{
        flexDirection:'column',
        backgroundColor:'#1b1b1b',
        marginBottom:5,
    },
    up:{
        flexDirection:'row',
        alignItems : 'center',
        padding:8
    },
    down:{
        marginLeft:56,
        flexDirection:'row',
        marginTop:-15,
        paddingBottom:16
    },
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    footerText: {
        textAlign: 'center',
        fontSize: 16,
        marginLeft: 10,
        color:'#ffb14c'
    },
    img:{
        width:40,
        height:40,
        borderRadius:20,
        marginRight:10
    },
    nameStyle:{
        color:'#cccccc'
    },
    reason:{
        color:'#ae8300',
        fontSize:11,
        lineHeight:22
    }
});
