import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
  DialogActions, DialogContent, DialogTitle, Switch, Text, Button, Toolbar as PaperToolbar,
  ToolbarContent, ToolbarAction
} from 'react-native-paper'
import Dialog from 'react-native-paper/src/components/Dialog/Dialog'
import { connect } from 'react-redux'
import { toggleAB, toggleHalf } from '../actions/index'

class Toolbar extends React.Component {
  state = {
    visibleWeeksManages: false
  }
  _toggleWeeksManager = () => {
    this.setState({
      visibleWeeksManages: !this.state.visibleWeeksManages
    })
  }

  _hideDialog = () => this.setState({ visibleWeeksManages: false })

  render () {
    return (
      <View>
        <Dialog
          visible={this.state.visibleWeeksManages}
          onDismiss={this._hideDialog}>
          <DialogTitle>Which week should be shown</DialogTitle>
          <DialogContent>
            <View style={{ width: '70%', alignSelf: 'center' }}>
              <View style={styles.switchWrapper}>
                <Text>
                  week A
                </Text>
                <Switch
                  value={this.props.AB === 'B'}
                  onValueChange={this.props.toggleAB}
                />
                <Text>
                  week B
                </Text>
              </View>
              <View style={styles.switchWrapper}>
                <Text>
                  1. half
                </Text>
                <Switch
                  value={this.props.half === 2}
                  onValueChange={this.props.toggleHalf}
                />
                <Text>
                  2. half
                </Text>
              </View>
            </View>
          </DialogContent>
          <DialogActions>
            <Button
              onPress={this._hideDialog}>Ok</Button>
          </DialogActions>
        </Dialog>
        <PaperToolbar>
          <ToolbarContent title={CARD_MAPPING[this.props.card]} subtitle={this.props.card === 5 ? '' : `${this.props.half}. half, week ${this.props.AB}`}/>

          <ToolbarAction icon="more-vert" onPress={this._toggleWeeksManager} />
        </PaperToolbar>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  switchWrapper: { margin: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }
})
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
  half: state.appState.half,
  card: state.appState.dayCard
})

const mapDispatchToProps = dispatch => ({
  toggleAB: () => dispatch(toggleAB()),
  toggleHalf: () => dispatch(toggleHalf())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)
