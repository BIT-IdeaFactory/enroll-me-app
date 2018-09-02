import React from 'react'
import { View } from 'react-native'
import {
  Button, Card, Checkbox, Text, Dialog, Paragraph, DialogContent, DialogTitle,
  DialogActions
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
        <Dialog
          visible={this.state.visibleDialogRemoval}
          onDismiss={this._hideDialog}>
          <DialogTitle>Remove enrollment</DialogTitle>
          <DialogContent>
            <Paragraph>This operation could not be undone</Paragraph>
          </DialogContent>
          <DialogActions>
            <Button onPress={this._hideDialog}>CANCEL</Button>
            <Button onPress={this._confirmRemoval}>OK</Button>
          </DialogActions>
        </Dialog>
        <Card
          style={{ flex: 1 }}
          onPress={this._onPress}
        >
          <View style={{ flexDirection: 'row', padding: 4, alignItems: 'center' }}>
            <View style={{ width: 36, height: 36 }}>
              <Checkbox
                checked={this.props.checked}
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
