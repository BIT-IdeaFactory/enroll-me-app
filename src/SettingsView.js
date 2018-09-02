import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Button, Caption, Card, Checkbox, ListItem, Modal, RadioButton, Switch, Text } from 'react-native-paper';
import ImportEnrollMeView2 from './ImportEnrollMeView2';
import ImportEnrollMeView from './ImportEnrollMeView';
import StorageManager from './StorageManager';

import React from 'react';
import { View } from 'react-native';

class Enrollment extends React.Component {
  state: {
    checked: false;
  }
  render() {
    return (
      <Card style={{
        backgroundColor: '#12541250'
      }}>
        <RadioButton
          value={this.props.name}
          checked={this.state.checked}
          onPress={() => { this.setState({ checked: 'firstOption' }); }}
        />
      </Card>
    );
  }
}



class SettingsView extends React.Component {
  state = {
    visibleEnrollMeImport: false,
    visibleEnrollMe2Import: false,
    keys: []
  }

  async componentDidMount() {
    const keys = await StorageManager.getKeys();
    console.log(keys)
    this.setState({
      keys
    })
  }
  _hideEnrollMe2Modal = () => this.setState({ visibleEnrollMe2Import:false });
  _hideEnrollMeModal = () => this.setState({ visibleEnrollMeImport:false });

  render() {
    return (
      <View style={styles.container}>
        <Modal visible={this.state.visibleEnrollMeImport} onDismiss={() => this.setState({ visibleEnrollMeImport:false })}>
          <ImportEnrollMeView onDismiss={this._hideEnrollMeModal}/>
        </Modal>
        <Modal visible={this.state.visibleEnrollMe2Import} onDismiss={this._hideEnrollMe2Modal}>
          <ImportEnrollMeView2 onDismiss={this._hideEnrollMe2Modal}/>
        </Modal>
        <Button raised onPress={() => this.setState({visibleEnrollMeImport : true})}>
          Import schedule from enroll-me
        </Button>
        <Button raised onPress={() => this.setState({visibleEnrollMe2Import : true})}>
          Import schedule from enroll-me-2
        </Button>
        {
          this.state.keys.map(name =>
            <Card style={{
              backgroundColor: '#12541250'
            }}>
              <Caption>
                {name}
              </Caption>
            </Card>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  enrollmentCard : {
    flexDirection: 'row'
  },
  container: {}
});

export default SettingsView;
