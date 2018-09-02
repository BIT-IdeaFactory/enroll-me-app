
import {
  Button, Dialog, DialogActions, TextInput, Toolbar, ToolbarAction, ToolbarBackAction,
  ToolbarContent
} from 'react-native-paper';
import * as React from 'react';
import { View, WebView, StyleSheet, Text } from 'react-native';


function parse() {
  setInterval(() => {
    const x = document.getElementsByClassName("event");
    const flat = [];
    for (let i = 0; i < x.length; i++) {
      flat[i] =
        {
          teacher: x[i].getElementsByClassName("teacher")[0].innerText,
          time: x[i].getElementsByClassName("timespan")[0].innerText,
          subject: x[i].getElementsByClassName("subject")[0].innerText,
          type: x[i].getElementsByClassName("type")[0].innerText,
        }
    }
    if (flat && flat.length !== 0 ) {
      window.postMessage(JSON.stringify(flat))
    }

  }, 1000)
}


const jsCode = parse.toString().replace("function parse() {\n ", "").replace(/}$/, "");

export default class ImportEnrollMeView2 extends React.Component {
  state = {
    xx:  "https://enroll-me.iiet.pl",
    visible: false,
    text: ""
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>

        </Text>
        <Dialog
          visible={this.state.visible}
          onDismiss={this._hideDialog}>
          <DialogActions>
            <Button onPress={() => {
              this.setState({
                visible: false,
                text: ""
              })

            }}>Cancel</Button>
            <Button onPress={() =>{
              StorageManager.saveEnrollment(this.state.text, this.kmh);
              this.setState({
                visible: false,
                text: ""
              })
            }}>Ok</Button>
            <TextInput
              style={{flex: 1}}
              label='name'
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
          </DialogActions>
        </Dialog>
        <WebView
          onNavigationStateChange={x =>
          {
            x.url &&
            x.url.startsWith("https://enroll-me.iiet.pl")
            && this.setState({
              xx: x.url.replace("https://localhost:3000/auth/accounts_iiet/callback?", "http://localhost:3000/auth/accounts_iiet/callback?")
            });
          }
          }
          onMessage={x => {
            const vvc = x.nativeEvent.data;
            if (vvc.length !== 15) {
              this.kmh = vvc;
            }
          }}
          source={{uri: this.state.xx}}
          injectedJavaScript={jsCode}
        />
          <Button onPress = {() => this.setState({visible: true})}>
            PARSE
          </Button>
          <Button onPress = {this.props.onDismiss}>
            CANCEL
          </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { width: '90%', height: '100%', alignSelf: 'center'}
});
