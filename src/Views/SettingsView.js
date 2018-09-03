import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Caption, Modal, Paragraph } from 'react-native-paper'
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
       <Modal visible={this.state.visibleEnrollMeImport} onDismiss={() => this.setState({ visibleEnrollMeImport: false })}>
         <ImportEnrollMeView onDismiss={this._hideEnrollMeModal} names={this.props.enrollments} />
       </Modal>
       <View style={styles.content}>
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
     </View>
   )
 }
}

const styles = StyleSheet.create({
  enrollmentCard: {
    flexDirection: 'row'
  },
  container: {},
  content: {
    padding: 8
  }
})

const mapStateToProps = state => ({
  selection: state.selection,
  enrollments: state.data.map(i => i.id)
})

export default connect(
  mapStateToProps
)(SettingsView)
