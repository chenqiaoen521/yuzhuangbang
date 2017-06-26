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
    ScrollView,
    Image,
    Dimensions,
    WebView,
    Alert
} from 'react-native';

var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Wz';
import Icons from 'react-native-vector-icons/Ionicons';
import IconDetail from '../Components/IconDetail';

export default class MainDetail extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
        tabBarIcon: ({ tintColor }) => (
            <Icon name="mineicon" size={25} color={tintColor} style={{marginTop:1.5}}/>
        ),
        headerRight: (
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icons.Button name="ios-add" backgroundColor="transparent" underlayColor="transparent" size={30} activeOpacity={0.8}
                onPress={() => { navigation.navigate('KehuAdd');} } />
                <Icons.Button name="md-search" backgroundColor="transparent" underlayColor="transparent" activeOpacity={0.8}
                onPress={ () => { navigation.navigate('KehuSearch'); } } />
            </View>
        )
    });

    
    render() {
        const {state} = this.props.navigation;
        let page = state.params.page;
        let html = null;
        if(page=='custom'){
            html = require('../fw/Client.html')
        }else if(page=='xq')(
            html = require('../fw/ClientXQ.html')
        )
        return (
            <ScrollView contentContainerStyle={styles.container}>
              <WebView
                automaticallyAdjustContentInsets={false}
                style={styles.webView}
                source={html}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onMessage={this.receiveMessage.bind(this)}
                decelerationRate="normal"
                startInLoadingState={true}
                scalesPageToFit={false} />
            </ScrollView>
        );
    }
    receiveMessage (e) {
        let message = e.nativeEvent.data
        if(message == 'aaa'){
            Alert.alert(message)
        }else if(message == 'xq'){
            const {navigate} = this.props.navigation;
            navigate('Kehu',{page:'xq',title:'客户详情'});
        }else{
            const {navigate} = this.props.navigation;
            navigate('SearchPage');
        }
    }
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
    },
});
