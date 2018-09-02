import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Button, Caption, Card, Checkbox, ListItem, Modal, RadioButton, Switch, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { toggleEnrollmentSelection } from '../actions/index';

class EnrollmentItem extends React.Component {
  state = {
    checked: false
  }
  _onPress = () => this.props.toggleEnrollmentSelection();

  render() {
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

const mapDispatchToProps = dispatch => ({
  toggleEnrollmentSelection: id => dispatch(toggleEnrollmentSelection(id))
})

export default connect(
  null,
  mapDispatchToProps,
)(EnrollmentItem)

