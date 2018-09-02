import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Button, Caption, Card, Checkbox, ListItem, Modal, RadioButton, Switch, Text } from 'react-native-paper';
import ImportEnrollMeView2 from './ImportEnrollMeView2';
import ImportEnrollMeView from './ImportEnrollMeView';
import StorageManager from './StorageManager';
import { connect } from 'react-redux';

class Enrollment extends React.Component {
  state = {
    checked: false
  }
  _onPress = () =>
    this.setState({
      checked: !this.state.checked
    })

  render() {
    console.warn(0);
    return (
      <Card
        onPress={this._onPress}
      >
      <View style={{ flexDirection: 'row' }}>
      <View  style={{width: 36, height: 36}}>
        <Checkbox
          checked={this.state.checked}
          onPress={this._onPress}
        >
          <Text>
            sefd
          </Text>
        </Checkbox>
      </View>
        <Text>
          {this.props.name}
        </Text>
      </View>
      </Card>
    );
  }
}



class SettingsView extends React.Component {
  state = {
    visibleEnrollMeImport: false,
  }
 _hideEnrollMeModal = () => this.setState({ visibleEnrollMeImport:false });

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Modal visible={this.state.visibleEnrollMeImport} onDismiss={() => this.setState({ visibleEnrollMeImport:false })}>
          <ImportEnrollMeView onDismiss={this._hideEnrollMeModal}/>
        </Modal>
        <Button raised onPress={() => this.setState({visibleEnrollMeImport : true})}>
          Import schedule from enroll-me
        </Button>
        {
          this.props.enrollments.map((name, i) =>
            <Enrollment key={`enr${i}`} name={name} selection={this.props.selection.indexOf(this.name) >= 0}/>
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

const mapStateToProps = state => ({
  selection: state.selection,
  enrollments: state.data.map(i => i.id)
})

export default connect(
  mapStateToProps,
)(SettingsView)

