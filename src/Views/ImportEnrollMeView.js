import {
  Button, Dialog, DialogActions, Paper, Paragraph, TextInput, DialogContent, Text
} from 'react-native-paper'
import * as React from 'react'
import { View, WebView, StyleSheet, Alert } from 'react-native'
import { addEnrollmentToData, toggleEnrollmentSelection } from '../actions/index'
import { connect } from 'react-redux'

// I regret to say that I'm not proud of this code
// It's dirty, unclean and not reliable but it is
// the only way to parse HTML to something readable

// This code is to be executed once a second in JS frame in order to
// parse current content and sent it via message which could be received from JS
const jsCode = `
  setInterval(() => {
    const days = [
      document.getElementsByClassName('fc-mon')[0].getBoundingClientRect().left,
      document.getElementsByClassName('fc-tue')[0].getBoundingClientRect().left,
      document.getElementsByClassName('fc-wed')[0].getBoundingClientRect().left,
      document.getElementsByClassName('fc-thu')[0].getBoundingClientRect().left,
      document.getElementsByClassName('fc-fri')[0].getBoundingClientRect().left
    ]
    const events = document.getElementsByClassName('fc-event')
    const flat = []
    for (let i = 0; i < events.length; i++) {
      const bounds = events[i].getBoundingClientRect()
      flat[i] =
        {
          center: (bounds.right + bounds.left) / 2,
          time: events[i].getElementsByClassName('fc-event-time')[0].innerText,
          content: events[i].getElementsByClassName('fc-event-content')[0].innerText
        }
    }
    if (flat && flat.length !== 0) {
      window.postMessage(JSON.stringify({ flat, days }))
    }
  }, 1000)
`

function _sanitizeFormat (input) {
  const parsed = JSON.parse(input)
  const getDay = pos => {
    let day = 0
    while (day < 4 && pos > parsed.days[day + 1]) {
      day++
    }
    return day
  }
  return parsed.flat.map(i => {
    const res = {}
    const times = i['time'].split('-').map(p => p.trim().split(':'))
    if (times[1][1].includes(' ')) {
      const f = times[1][1].split(' ')
      res.timeSpecifier = f[1]
      times[1][1] = f[0]
    } else {
      res.timeSpecifier = null
    }
    res.startTime = times[0].map(f => Number(f))
    res.endTime = times[1].map(f => Number(f))
    if (res.endTime[0] < 8) {
      res.endTime[0] += 12
      if (res.startTime[0] < 12) {
        res.startTime[0] += 12
      }
    }
    const con = i['content'].split(',').map(c => c.trim())
    res.name = con[0]
    res.teacher = con[1]
    const placeAndType = con[2].split('-').map(c => c.trim())
    res.place = placeAndType[0]
    if (placeAndType[1] === 'W') {
      res.type = 'Lecture'
    } else if (placeAndType[1] === 'C') {
      res.type = 'Class'
    } else if (placeAndType[1] === 'L') {
      res.type = 'Laboratory'
    }
    res.day = getDay(i['center'])
    return res
  })
}
class ImportEnrollMeView extends React.Component {
  state = {
    visibleDialog: false,
    text: ''
  };

  _saveToMemory = () => {
    const name = this.state.text
    if (this.props.names.includes(name)) {
      Alert.alert('Schedule with this name already exists')
      return
    }
    if (this.currentScheduleNotParsed === undefined) {
      Alert.alert('Nothing to be saved!')
    } else {
      const sanitizedForm = _sanitizeFormat(this.currentScheduleNotParsed)
      this.props.addEnrollment({
        id: name,
        data: sanitizedForm
      })
    }
    // TODO manage it better
    this.props.onDismiss()
  }

  render () {
    return (
      <View style={styles.container}>
        <Dialog
          visible={this.state.visibleDialog}
          onDismiss={() => { this.currentScheduleNotParsed = undefined; this.setState({ visibleDialog: false }); this.props.onDismiss() }}>
          <DialogContent>
            <Text>
              Select name for your enrollment
            </Text>
          </DialogContent>
          <DialogActions style={{ alignItems: 'center' }}>
            <Button onPress={() => {
              this.setState({
                visibleDialog: false,
                text: ''
              })
            }}>Cancel</Button>
            <Button
              disabled = {this.state.text === ''}
              onPress={this._saveToMemory}>Ok</Button>
            <TextInput
              style={{ flex: 1, paddingBottom: 30 }}
              label='name'
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
          </DialogActions>
        </Dialog>
        <Paper style={{ padding: 4 }}>
          <Paragraph>
            In order to import navigate to your schedule and press PARSE when your schedule will be visible on page.
            Then choose name for your timetable
          </Paragraph>
        </Paper>
        <WebView
          onMessage={({ nativeEvent: { data: messageData } }) => {
            if (messageData.length !== 15) {
              this.currentScheduleNotParsed = messageData
            }
          }}
          source={{ uri: 'https://enroll-me.iiet.pl' }}
          injectedJavaScript={jsCode}
        />
        <Button style = {{ backgroundColor: 'white' }} onPress = {() => this.setState({ visibleDialog: true })}>
          PARSE
        </Button>
        <Button style = {{ backgroundColor: 'white' }} onPress = {this.props.onDismiss}>
          CANCEL
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { width: '90%', height: '90%', alignSelf: 'center' }
})

const mapDispatchToProps = dispatch => ({
  addEnrollment: data => {
    dispatch(addEnrollmentToData(data))
    dispatch(toggleEnrollmentSelection(data.id))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(ImportEnrollMeView)
