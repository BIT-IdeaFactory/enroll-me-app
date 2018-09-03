import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { Caption, Headline, Paper, Paragraph } from 'react-native-paper'
import { toggleAB, toggleHalf } from '../actions/index'

const minutize = number => number < 10 ? `0${number}` : number

class SingleDayView extends React.Component {
  state = {
    visibleWeeksManages: false
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 72 }}>
          {this.props.events.length === 0 && (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 128 }}>
              <Paragraph>
                Nothing here
              </Paragraph>
              <Paragraph>
                ¯\_(ツ)_/¯
              </Paragraph>
            </View>
          )}
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
    elevation: 8,
    margin: 14,
    padding: 12
  }
})
