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
    Alert,
    TouchableOpacity,
    Modal,
    BackHandler,
    TouchableWithoutFeedback
} from 'react-native';
var {width,height} = Dimensions.get('window');
import * as WeChat from 'react-native-wechat';
import LoadingView from '../Components/LoadingView';
import Icon from 'react-native-vector-icons/Wz';
import IconDetail from '../Components/IconDetail';
import Ionicons from 'react-native-vector-icons/Ionicons';
let canGoBack = false;
//获取公共域名
var url = require('../config.json').url
//弹窗信息
import ToastUtil from '../utils/ToastUtil'
//存储登录信息
import store from 'react-native-simple-store';
const shareIconWechat = require('../imgs/share_icon_wechat.png');
const shareIconMoments = require('../imgs/share_icon_moments.png');
export default class WorkDetail extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '详情',//navigation.state.params.title,
        tabBarIcon: ({ tintColor }) => (
            <Icon name="mineicon" size={25} color={tintColor} style={{marginTop:1.5}}/>
        ),
        headerRight: (
            <Ionicons.Button name="md-share" backgroundColor="transparent" underlayColor="transparent" activeOpacity={0.8}
            onPress={ () => { navigation.state.params.handleShare(); } } />
        )
    });

    // 构造
    constructor(props) {
        super(props);
        var that = this;
        // 初始状态
        this.state = {
            htmlsrc:'http://192.168.0.188/App/Index/work_detail/id/205/token/80_976_2_59_648',
            isShareModal: false
        };
       this.onActionSelected = this.onActionSelected.bind(this);
        this.renderSpinner = this.renderSpinner.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleShare: ()=>this.onActionSelected() });
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }
    componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.goBack);
  }
    onNavigationStateChange(navState) {
      canGoBack = navState.canGoBack;
    }
    goBack() {
    if (this.state.isShareModal) {
      this.setState({
        isShareModal: false
      });
      return true;
    } else if (canGoBack) {
      this.webview.goBack();
      return true;
    }
    return false;
  }
    onActionSelected () {
        this.setState({
            isShareModal: true
        });
    }
    renderLoading() {
        return <LoadingView />;
    }
    render() {
        const {state} = this.props.navigation;
        let page = state.params.url;
        //console.log(`${url}${page}`)
        return (
            <View style={styles.container}>
                <Modal
                      animationType="fade"
                      visible={this.state.isShareModal}
                      transparent
                      onRequestClose={() => {
                        this.setState({
                          isShareModal: false
                        });
                      }}
                    >
                    {this.renderSpinner()}
                </Modal>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri:`${url}${page}`}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onMessage={this.receiveMessage.bind(this)}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    renderLoading={this.renderLoading}
                    onNavigationStateChange={this.onNavigationStateChange}
                    scalesPageToFit={false} />
            </View>
        );
    }

    receiveMessage (e) {
        let message = e.nativeEvent.data;
        console.log(message);
        const {navigate} = this.props.navigation;
        var that = this
        if( message.indexOf('login')>0){
            ToastUtil.showShort('请先登录！')
            navigate('Main')
        }else if(message.indexOf('home_page')>0){
            navigate('MyHomeOther',{title:'设计师主页',url:message})
        }else if(message.indexOf('hare')>0){
            that.onActionSelected()
        }else if(message.indexOf('ubao')>0){
            navigate('Feedback');
        }
    }
    
    renderSpinner() {
      const { params } = this.props.navigation.state;
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              isShareModal: false
            });
          }}
        >
        <View key={'spinner'} style={styles.spinner}>
          <View style={styles.spinnerContent}>
            <Text style={[styles.spinnerTitle, { fontSize: 20, color: 'black' }]} >
              分享到
            </Text>
            <View style={styles.shareParent}>
              <TouchableOpacity
                style={styles.base}
                onPress={() => {
                  WeChat.isWXAppInstalled().then((isInstalled) => {
                    if (isInstalled) {
                      WeChat.shareToSession({
                        title:'分享自：预装帮',
                        description: '分享自：预装帮',
                        thumbImage: null,
                        type: 'news',
                        webpageUrl: 'https://www.baidu.com/'
                      }).catch((error) => {
                        ToastUtil.showShort(error.message, true);
                      });
                    } else {
                      ToastUtil.showShort('没有安装微信软件，请您安装微信之后再试', true);
                    }
                  });
                }}
              >
                <View style={styles.shareContent}>
                  <Image style={styles.shareIcon} source={shareIconWechat} />
                  <Text style={styles.spinnerTitle}>
                    微信
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.base}
                onPress={() => {
                  WeChat.isWXAppInstalled().then((isInstalled) => {
                    if (isInstalled) {
                      WeChat.shareToTimeline({
                        title:`[@iReading]预装帮`,
                        thumbImage: '',
                        type: 'news',
                        webpageUrl: `${url}${page}`
                      }).catch((error) => {
                        ToastUtil.showShort(error.message, true);
                      });
                    } else {
                      ToastUtil.showShort('没有安装微信软件，请您安装微信之后再试', true);
                    }
                  });
                }}
              >
                <View style={styles.shareContent}>
                  <Image style={styles.shareIcon} source={shareIconMoments} />
                  <Text style={styles.spinnerTitle}>
                    朋友圈
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
    },
    spinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  },
  spinnerContent: {
    justifyContent: 'center',
    width: Dimensions.get('window').width * (7 / 10),
    height: Dimensions.get('window').width * (7 / 10) * 0.68,
    backgroundColor: '#fcfcfc',
    padding: 20,
    borderRadius: 5
  },
  spinnerTitle: {
    fontSize: 18,
    color: '#313131',
    textAlign: 'center',
    marginTop: 5
  },
  shareParent: {
    flexDirection: 'row',
    marginTop: 20
  },
  shareContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareIcon: {
    width: 40,
    height: 40
  }
});
