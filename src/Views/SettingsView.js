import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Caption, Modal, Paragraph, Toolbar, ToolbarContent } from 'react-native-paper'
import ImportEnrollMeView from './ImportEnrollMeView'
import { connect } from 'react-redux'
import EnrollmentItemListComponent from './EnrollmentItemListComponent'

class SettingsView extends React.Component {
  state = {
    visibleEnrollMeImport: false
  }
 _hideEnrollMeModal = () => this.setState({ visibleEnrollMeImport: false });

 render () {
   return (
     <View style={styles.container}>
       <Toolbar>
         <ToolbarContent title="Settings"/>

       </Toolbar>
       <Modal visible={this.state.visibleEnrollMeImport} onDismiss={() => this.setState({ visibleEnrollMeImport: false })}>
         <ImportEnrollMeView onDismiss={this._hideEnrollMeModal} names={this.props.enrollments} />
       </Modal>
       <Button raised onPress={() => this.setState({ visibleEnrollMeImport: true })}>
          Import schedule from enroll-me
       </Button>
       <Caption>
         Enabled enrollments
       </Caption>
       {
         this.props.enrollments.map((name, i) =>
           <EnrollmentItemListComponent key={`enr${i}`} name={name} checked={this.props.selection.includes(name)}/>
         )
       }
       {
         this.props.enrollments.length === 0 && (
           <Paragraph>
             No imported enrollments
           </Paragraph>
         )
       }
     </View>
   )
 }
}

const styles = StyleSheet.create({
  enrollmentCard: {
    flexDirection: 'row'
  },
  container: {}
})

const mapStateToProps = state => ({
  selection: state.selection,
  enrollments: state.data.map(i => i.id)
})

export default connect(
  mapStateToProps
)(SettingsView)
