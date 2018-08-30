import * as React from 'react';
import {
  BottomNavigation, Button, Dialog, DialogActions, Headline, TextInput, Toolbar, ToolbarAction,
  ToolbarBackAction, ToolbarContent
} from 'react-native-paper';
import { View, StyleSheet, WebView } from 'react-native';
import StorageManager from './StorageManager'

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const BOTTOM_NAV_DAYS = {};
DAYS.forEach(d => BOTTOM_NAV_DAYS[d] = () => <Sample day={d}/>)


export default class App extends React.Component {
  state = {
    index: 0,
    routes: DAYS.map(i => ({
      key: i, title: i, icon: 'arrow-drop-down'
    }))
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap(BOTTOM_NAV_DAYS);

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}


function makeMagic() {
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

const jsCode = makeMagic.toString().replace("function makeMagic() {\n ", "").replace(/}$/, "");

class Sample extends React.Component {
  state = {
    xx:  "http://localhost:3000",
    couldParse: false,
    visible: false,
    text: ""
  };
  render() {
    return (
      <View style={styles.container}>
        <Toolbar>
          <ToolbarBackAction
            onPress={this._goBack}
          />
          <ToolbarContent
            title="enroll me"
          />
          <ToolbarAction icon="settings" onPress={this._onMore} />
        </Toolbar>
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
              StorageManager.save(this.state.text, this.kmh);
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
              x.url.startsWith("https://localhost:3000")
              && this.setState({
                xx: x.url.replace("https://localhost:3000/auth/accounts_iiet/callback?", "http://localhost:3000/auth/accounts_iiet/callback?")
              });
            }
          }
          onMessage={x => {
            const vvc = x.nativeEvent.data;
            if (vvc.length !== 15) {
              this.kmh = vvc;
              this.setState({
                couldParse: true
              })
            }
          }}
          source={{uri: this.state.xx}}
          injectedJavaScript={jsCode}
        />
        <Button onPress = {() => this.setState({visible: true})} disabled={!this.state.couldParse}>
          PARSE
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1}
});
