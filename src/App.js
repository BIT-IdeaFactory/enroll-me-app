import * as React from 'react';
import {
  BottomNavigation, Button, Dialog, DialogActions, Headline, TextInput, Toolbar, ToolbarAction,
  ToolbarBackAction, ToolbarContent
} from 'react-native-paper';
import { View, StyleSheet, AsyncStorage, WebView } from 'react-native';
import StorageManager from './StorageManager'
import SettingsView from './SettingsView';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const BOTTOM_NAV_DAYS = {settings: SettingsView};
DAYS.forEach(d => BOTTOM_NAV_DAYS[d] = () => <Sample day={d}/>)


export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      ...DAYS.map(i => ({
        key: i, title: i, icon: 'arrow-drop-down'
      })),
        {
          key: 'settings', title: 'Settings', icon: 'settings'
        }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap(BOTTOM_NAV_DAYS);

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}


class Sample extends React.Component {
  render() {
    return (
      <View style={styles.container}></View>
    );
  }
}



const styles = StyleSheet.create({
  container: {flex: 1}
});
