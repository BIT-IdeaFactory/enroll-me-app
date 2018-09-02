import * as React from 'react'
import { BottomNavigation } from 'react-native-paper'
import SettingsView from './Views/SettingsView'
import SingleDayView from './Views/SingleDayView'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI']
const BOTTOM_NAV_DAYS = { settings: SettingsView }
for (let i = 0; i < DAYS.length; i++) {
  BOTTOM_NAV_DAYS[DAYS[i]] = () => <SingleDayView day={i}/>
}

export default class App extends React.Component {
  state = {
    loaded: true
  };
  componentDidMount () {

  }
  render () {
    if (this.state.loaded) { return <NavigationWrapper/> }
    return <LoadingView/>
  }
}

class NavigationWrapper extends React.Component {
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

  render () {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    )
  }
}

class LoadingView extends React.Component {
  render () {
    return <View style={styles.container} >
      <ActivityIndicator/>
    </View>
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})
