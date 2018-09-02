
import {
  Button, Dialog, DialogActions, TextInput
} from 'react-native-paper'
import * as React from 'react'
import { View, WebView, StyleSheet, Text, Alert } from 'react-native'
import { addEnrollmentToData } from '../actions/index'
import { connect } from 'react-redux'

function parse () {
  setInterval(() => {
    const days = [
      document.getElementsByClassName('fc-mon')[0].getBoundingClientRect().left,
      document.getElementsByClassName('fc-tue')[0].getBoundingClientRect().left,
      document.getElementsByClassName('fc-wed')[0].getBoundingClientRect().left,
      document.getElementsByClassName('fc-thu')[0].getBoundingClientRect().left,
      document.getElementsByClassName('fc-fri')[0].getBoundingClientRect().left
    ]
    const x = document.getElementsByClassName('fc-event')
    const flat = []
    for (let i = 0; i < x.length; i++) {
      const bou = x[i].getBoundingClientRect()
      flat[i] =
        {
          center: (bou.right + bou.left) / 2,
          time: x[i].getElementsByClassName('fc-event-time')[0].innerText,
          content: x[i].getElementsByClassName('fc-event-content')[0].innerText
        }
    }
    if (flat && flat.length !== 0) {
      window.postMessage(JSON.stringify({ flat, days }))
    }
  }, 1000)
}

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
    const times = i['time'].split('-').map(p => p.trim().split(':').map(f => Number(f)))
    res.startTime = times[0]
    res.endTime = times[1]
    if (res.endTime[0] < 8) {
      res.endTime[0] += 12
      res.startTime[0] += 12
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
    console.log(res)
    return res
  })
}

const jsCode = parse.toString().replace('function parse() {\n ', '').replace(/}$/, '')

class ImportEnrollMeView extends React.Component {
  state = {
    visible: false,
    text: ''
  };

  _saveToMemory = () => {
    let name = this.state.text
    if (this.kmh === undefined) {
      Alert.alert('Nothing to be saved!')
    } else {
      const sanitizedForm = _sanitizeFormat(this.kmh)
      this.props.addEnrollment({
        id: name,
        data: sanitizedForm
      })
    }
    this.setState({
      visible: false,
      text: ''
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>
        </Text>
        <Dialog
          visible={this.state.visible}
          onDismiss={() => { this.kmh = undefined; this.setState({ visible: false }); this.props.onDismiss() }}>
          <DialogActions>
            <Button onPress={() => {
              this.setState({
                visible: false,
                text: ''
              })
            }}>Cancel</Button>
            <Button
              disabled = {this.state.text === ''}
              onPress={this._saveToMemory}>Ok</Button>
            <TextInput
              style={{ flex: 1 }}
              label='name'
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
          </DialogActions>
        </Dialog>
        <WebView
          onMessage={x => {
            const vvc = x.nativeEvent.data
            if (vvc.length !== 15) {
              this.kmh = vvc
            }
          }}
          source={{ uri: 'https://enroll-me.iiet.pl' }}
          injectedJavaScript={jsCode}
        />
        <Button onPress = {() => this.setState({ visible: true })}>
          PARSE
        </Button>
        <Button onPress = {this.props.onDismiss}>
          CANCEL
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { width: '90%', height: '100%', alignSelf: 'center' }
})

const mapDispatchToProps = dispatch => ({
  addEnrollment: data => dispatch(addEnrollmentToData(data))
})

export default connect(
  null,
  mapDispatchToProps
)(ImportEnrollMeView)
