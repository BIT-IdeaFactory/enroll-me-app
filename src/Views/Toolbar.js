import React from 'react'
import { View } from 'react-native'
import { Button, Appbar, Portal } from 'react-native-paper'
import Dialog from 'react-native-paper/src/components/Dialog/Dialog'
import { connect } from 'react-redux'
import { setLastSelectedDay, toggleAB } from '../actions/index'
import { weekize } from './ViewsUtils'

class Toolbar extends React.Component {
  state = {
    visibleWeeksManages: false
  }
  _toggleWeeksManager = () => {
    this.setState({
      visibleWeeksManages: !this.state.visibleWeeksManages
    })
  }

  _getToday = () => {
    let day = new Date().getDay()
    day = (day === 0 || day === 6) ? 0 : day - 1
    this.props.setDay(day)
  }

  _hideDialog = () => this.setState({ visibleWeeksManages: false })

  render () {
    return (
      <View>
        <Portal>
          <Dialog
            visible={this.state.visibleWeeksManages}
            onDismiss={this._hideDialog}>
            <Dialog.Title>Which week should be shown</Dialog.Title>
            <Dialog.Content>
              <View style={{ width: '70%', alignSelf: 'center' }}>
                <Button flat onPress={this.props.toggleAB}>
                  {weekize(this.props.AB)}
                </Button>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={this._hideDialog}>Ok</Button>
            </Dialog.Actions>
          </Dialog><Dialog
            visible={this.state.visibleWeeksManages}
            onDismiss={this._hideDialog}>
            <Dialog.Title>Which week should be shown</Dialog.Title>
            <Dialog.Content>
              <View style={{ width: '70%', alignSelf: 'center' }}>
                <Button flat onPress={this.props.toggleAB}>
                  {weekize(this.props.AB)}
                </Button>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={this._hideDialog}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Appbar.Header>
          <Appbar.Action icon="event" onPress={this._getToday} />

          <Appbar.Content title={CARD_MAPPING[this.props.card]} subtitle={weekize(this.props.AB)}/>

          <Appbar.Action icon="more-vert" onPress={this._toggleWeeksManager} />
        </Appbar.Header>
      </View>
    )
  }
}

const CARD_MAPPING = {
  0: 'Monday',
  1: 'Tuesday',
  2: 'Wednesday',
  3: 'Thursday',
  4: 'Friday',
  5: 'Settings'
}

const mapStateToProps = (state, props) => ({
  AB: state.appState.ab,
  card: state.appState.dayCard
})

const mapDispatchToProps = dispatch => ({
  toggleAB: () => dispatch(toggleAB()),
  setDay: d => dispatch(setLastSelectedDay(d))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)
