import * as React from 'react'
import { BottomNavigation } from 'react-native-paper'
import SettingsView from '../Views/SettingsView'
import SingleDayView from '../Views/SingleDayView'
import { connect } from 'react-redux'
import { setLastSelectedDay } from '../actions/index'

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI']
const BOTTOM_NAV_DAYS = { settings: SettingsView }
for (let i = 0; i < DAYS.length; i++) {
  BOTTOM_NAV_DAYS[DAYS[i]] = () => <SingleDayView dayCard={i}/>
}

class NavigationWrapper extends React.Component {
  state = {
    index: 0,
    routes: [
      {
        key: 'MON', title: 'MON', icon: 'sentiment-very-dissatisfied'
      },
      {
        key: 'TUE', title: 'TUE', icon: 'sentiment-dissatisfied'
      },
      {
        key: 'WED', title: 'WED', icon: 'sentiment-neutral'
      },
      {
        key: 'THU', title: 'THU', icon: 'sentiment-satisfied'
      },
      {
        key: 'FRI', title: 'FRI', icon: 'sentiment-very-satisfied'
      },
      {
        key: 'settings', title: 'Settings', icon: 'settings'
      }
    ]
  };

  _handleIndexChange = index => {
    this.props.setDay(index)
  };

  _renderScene = BottomNavigation.SceneMap(BOTTOM_NAV_DAYS);

  render () {
    return (
      <BottomNavigation
        navigationState={{ ...this.state, index: this.props.dayIndex }}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    dayIndex: state.appState.dayCard
  }
}

const mapDispatchToProps = dispatch => ({
  setDay: i => dispatch(setLastSelectedDay(i))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationWrapper)
