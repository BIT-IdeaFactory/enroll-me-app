import * as React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {
  Toolbar, ToolbarContent, Headline, Paper, Caption, Paragraph, ToolbarAction, Dialog,
  DialogTitle, DialogContent, DialogActions, Button, Switch, Text
} from 'react-native-paper'
import { toggleAB, toggleHalf } from '../actions/index'

const DAY_MAPPING = {
  0: 'Monday',
  1: 'Tuesday',
  2: 'Wednesday',
  3: 'Thursday',
  4: 'Friday',
  5: 'Settings'
}
const minutize = number => number < 10 ? `0${number}` : number

class SingleDayView extends React.Component {
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
      <View style={styles.container}>
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
        <Toolbar>
          <ToolbarContent title={DAY_MAPPING[this.props.dayCard]}/>
          <ToolbarAction icon="more-vert" onPress={this._toggleWeeksManager} />
        </Toolbar>
        <ScrollView style={styles.container}>
          {this.props.events.map((ev, i) =>
            <Paper key={`ev${i}`} style={styles.paperEvent}>
              <Paragraph>
                {`${ev.startTime[0]}:${minutize(ev.startTime[1])} - ${ev.endTime[0]}:${minutize(ev.endTime[1])} ${ev.timeSpecifier !== null ? ev.timeSpecifier : ''}`}
              </Paragraph>
              <Paragraph>
                {`${ev.place} ${ev.type}`}
              </Paragraph>
              <Headline>
                {ev.name}
              </Headline>
              <Caption>
                {ev.teacher}
              </Caption>
            </Paper>
          )
          }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  const evs = []
  for (let i = 0; i < state.data.length; i++) {
    if (state.selection.includes(state.data[i].id)) {
      for (let j = 0; j < state.data[i].data.length; j++) {
        const spec = state.data[i].data[j].timeSpecifier
        if (state.data[i].data[j].day === props.dayCard &&
          (spec === null || spec === state.appState.ab || spec === state.appState.half)) {
          evs.push(state.data[i].data[j])
        }
      }
    }
  }
  evs.sort((a, b) => a.startTime[0] === b.startTime[1] ? a.startTime[1] > b.startTime[1] : a.startTime[0] > b.startTime[0])
  return {
    events: evs,
    AB: state.appState.ab,
    half: state.appState.half
  }
}

const mapDispatchToProps = dispatch => ({
  toggleAB: () => dispatch(toggleAB()),
  toggleHalf: () => dispatch(toggleHalf())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleDayView)

const styles = StyleSheet.create({
  paperEvent: {
    elevation: 12,
    margin: 14,
    padding: 12
  },
  switchWrapper: { margin: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }
})
