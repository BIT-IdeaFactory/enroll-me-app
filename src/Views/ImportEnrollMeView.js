import { Button, Dialog, Paragraph, Portal, Surface, Text, TextInput } from 'react-native-paper'
import * as React from 'react'
import { Alert, StyleSheet, View, WebView } from 'react-native'
import { addEnrollmentToData, toggleEnrollmentSelection } from '../actions/index'
import { connect } from 'react-redux'

// I regret to say that I'm not proud of this code
// It's dirty, unclean and not reliable but it is
// the only way to parse HTML to something readable

// This code is to be executed once a second in JS frame in order to
// parse current content and sent it via message which could be received from JS
const jsCode = `
  setInterval(() => {
     window.postMessage(JSON.stringify($(":data(fullCalendar)").fullCalendar("clientEvents")))
  }, 1000)
`

const _sanitizeFormat = input =>
  JSON.parse(input).map(({ title: name, _start, _end, teacher, weekType, place, activityType: type }) => ({
    name,
    startTime: Date.parse(_start),
    endTime: Date.parse(_end),
    teacher,
    weekType,
    place: place,
    type: (t => t === 'W' ? 'Lecture' : t === 'C' ? 'Class' : 'Laboratory')(type)
  }))

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
        <Portal>
          <Dialog
            visible={this.state.visibleDialog}
            onDismiss={() => {
              this.setState({ visibleDialog: false })
              this.props.onDismiss()
            }}>
            <Dialog.Content>
              <Text>
                Select name for your enrollment
              </Text>
            </Dialog.Content>
            <Dialog.Actions style={{ alignItems: 'center' }}>
              <Button onPress={() => {
                this.setState({
                  visibleDialog: false,
                  text: ''
                })
              }}>Cancel</Button>
              <Button
                disabled={this.state.text === ''}
                onPress={this._saveToMemory}>Ok</Button>
              <TextInput
                style={{ flex: 1, paddingBottom: 30 }}
                label='name'
                value={this.state.text}
                onChangeText={text => this.setState({ text })}
              />
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Surface style={{ padding: 4 }}>
          <Paragraph>
            In order to import navigate to your schedule and press PARSE when your schedule will be visible on page.
            Then choose name for your timetable
          </Paragraph>
        </Surface>
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
