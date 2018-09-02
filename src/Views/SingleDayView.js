import * as React from 'react'
import { View, StyleSheet, Text } from 'react-native'

class SingleDayView extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>
          {this.props.day}
        </Text>
      </View>
    )
  }
}

export default SingleDayView

const styles = StyleSheet.create({
  container: { flex: 1 }
})
