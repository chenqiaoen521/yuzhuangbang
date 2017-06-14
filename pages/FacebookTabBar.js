import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

var {width,height} = Dimensions.get('window');
const FacebookTabBar = React.createClass({
  tabIcons: [],
  tabTexts: ['全部','发布','审核',],
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({ value, }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = Math.min(1, Math.abs(value - i))
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
    
  },

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {
    return <View style={[styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth:2,
              paddingTop:8,
              borderBottomColor:this.props.activeTab === i ? '#b08400' : '#1b1b1b'
        }}>
          {/*<Icon
            name={tab}
            size={30}
            color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
            ref={(icon) => { this.tabIcons[i] = icon; }}
          />*/}
          <Text style={{
              color:this.props.activeTab === i ? '#fff' : '#808080',
              fontSize:15, 
              height:30,
              }} 
              
          >
            { this.tabTexts[i] }
          </Text>
        </TouchableOpacity>;
      })}
    </View>;
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 42,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    backgroundColor:'#1b1b1b'
  },
});

export default FacebookTabBar;
