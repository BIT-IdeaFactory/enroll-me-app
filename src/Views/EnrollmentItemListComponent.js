import React from 'react'
import { View } from 'react-native'
import {
  Button, Card, Checkbox, Text, Dialog, Paragraph, Portal
} from 'react-native-paper'
import { connect } from 'react-redux'
import { removeEnrollmentFromData, toggleEnrollmentSelection } from '../actions/index'

class EnrollmentItem extends React.Component {
  state = {
    checked: false,
    visibleDialogRemoval: false
  }
  _onPress = () => this.props.toggleEnrollmentSelection();

  _removeEnrollment = () => {
    this.setState({ visibleDialogRemoval: true })
  }

  _hideDialog = () => this.setState({ visibleDialogRemoval: false })

  _confirmRemoval = () => {
    this.props.removeEnrollment()
    this._hideDialog()
  }

  render () {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Portal>
          <Dialog
            visible={this.state.visibleDialogRemoval}
            onDismiss={this._hideDialog}>
            <Dialog.Title>Remove enrollment</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This operation could not be undone</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>CANCEL</Button>
              <Button onPress={this._confirmRemoval}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Card
          style={{ flex: 1 }}
          onPress={this._onPress}
        >
          <View style={{ flexDirection: 'row', padding: 4, alignItems: 'center' }}>
            <View style={{ width: 36, height: 36 }}>
              <Checkbox
                status={this.props.checked ? 'checked' : 'unchecked'}
                onPress={this._onPress}
              />
            </View>
            <Text>
              {this.props.name}
            </Text>
          </View>
        </Card>
        <Button onPress={this._removeEnrollment}>
          REMOVE
        </Button>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  toggleEnrollmentSelection: () => dispatch(toggleEnrollmentSelection(props.name)),
  removeEnrollment: () => dispatch(removeEnrollmentFromData(props.name))
})

export default connect(
  null,
  mapDispatchToProps
)(EnrollmentItem)
