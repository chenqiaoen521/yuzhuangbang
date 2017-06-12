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
import Unit from '../Components/Unit';
import ActionSheet from 'react-native-actionsheet';
import LoadingView from '../Components/LoadingView';
import * as listActionCreators from '../actions/list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Message extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds
    };
  }
  static navigationOptions = {
    title:'我的消息',
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
  componentDidMount () {
    const {listActions} = this.props;
    listActions.requestArticleList(false,true,false)
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>                                                   
    );
  }
  renderContent(){
    if(this.props.list.loading){
      return (
        <LoadingView/>
        )
    }else{
      return (
        <ListView
             dataSource={this.state.dataSource.cloneWithRows(this.props.list.articleList)}
             renderRow={(rowdata)=>this.renderRow(rowdata)}
             contentContainerStyle={styles.contentViewStyle}
             enableEmptySections={true}
             initialListSize ={1}
             onEndReached={() => this.onEndReached()}
             onEndReachedThreshold ={100}
             renderFooter={()=>this.renderFooter()}
             refreshControl={
                <RefreshControl
                  style={styles.refreshControlBase}
                  refreshing={this.props.list.isRefreshing}
                  onRefresh={() => this.onRefresh()}
                  title="Loading..."
                  colors={['#ffaa66cc']}
                />
             }
          />
        )
      }
  }
  onEndReached(){
    const {listActions} = this.props;
    listActions.requestArticleList(false,false,true);
  }
  onRefresh(){
    const {listActions} = this.props;
    listActions.requestArticleList(true,false,false);
  }
  renderRow(rowdata){
      return (
        <TouchableOpacity style={styles.unit} onPress={()=>this.toDetail()}>
          <View style={styles.item}>
            <View style={styles.icon}>
              <Icon name="bell-o"  style={{fontSize:14,color:'#fff'}}/>
            </View>
            <Text style={styles.date}>{rowdata.date}</Text>
          </View>
          <Text style={styles.title}>{rowdata.title}</Text>
          <Text style={styles.info}>{rowdata.info}</Text>
        </TouchableOpacity>
      )
  }
  toDetail(){
    const {navigate} = this.props.navigation;
    navigate('messageFriend');
  }
  renderFooter(){
    if(this.props.list.isLoadMore){
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator size="small" color="#ffb14c" />
          <Text style={styles.footerText}>
            数据加载中……
          </Text>
        </View>
      );
    }else{
      return (
        <View/>
        )
    }
    
  }
}

const mapStateToProps = (state) => {
  const { list } = state;
  return {
    list
  };
};

const mapDispatchToProps = (dispatch) => {
  const listActions = bindActionCreators(listActionCreators, dispatch);
  return {
    listActions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
  },
  unit:{
    alignItems : 'flex-start',
    backgroundColor:'#232121',
    paddingLeft:10,
    paddingRight:10,
    marginBottom:6
  },
  item:{
    flexDirection:'row',
    justifyContent :'center',
    alignItems:'center',
    height:46
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
  icon:{
    backgroundColor:'#ae8300',
    borderRadius:12,
    width:24,
    height:24,
    alignItems:'center',
    justifyContent :'center',
    marginRight:10
  },
  date:{
    color:'#acacac',
    fontSize:14,
  },
  title:{
    color:'#cccccc',
    fontSize:17,
    marginBottom:13
  },
  info:{
    color:'#999999',
    fontSize:15,
    paddingBottom:15
  },
  refreshControlBase: {
    backgroundColor: 'transparent'
  },
});
