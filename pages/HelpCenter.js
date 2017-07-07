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
    Switch
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import HelpSearch from '../Components/HelpSearch';
import HelpListview from '../Components/HelpListview';
import ToastUtil from '../utils/ToastUtil';
import {request} from '../utils/asyncRequest';
const host = require('../config.json').url;
import store from 'react-native-simple-store';
export default class HelpCenter extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        data:[]
      };
    }
    static navigationOptions = {
        headerTitle:'帮助中心',
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
    componentWillMount () {
        let that = this;
        request(`${host}/App/Index/help_list`,'GET').then(function(data){
            that.setState({
                data:data.data
            })
         })
    }
    render() {
        return (
            <View style={styles.container}>
                <HelpSearch popToHome={()=>this.toSearchPage()} />
                <View style={styles.hotit}><Text style={styles.biao}>热点问题</Text></View>
                <HelpListview data={this.state.data} popToWatch={(id)=>this.toHelpView(id)} />
            </View>
        );
    }
    toHelpView (id) {
        const {navigate} = this.props.navigation;
        navigate('MainDetail',{id:id,page:'/App/Index/article_detail'});
    }
    toSearchPage () {
        //const {navigate} = this.props.navigation;
        //navigate('SearchPage')
    }
    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#151515'
    },
    hotit: {
        padding:10
    },
    biao: {
        color:'#999',
        fontSize:16
    }
});
