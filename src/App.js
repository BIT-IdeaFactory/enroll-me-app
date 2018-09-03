import * as React from 'react'
import NavWrapper from './Views/NavWrapper'
import { StyleSheet, View } from 'react-native'
import Toolbar from './Views/Toolbar'

export default class App extends React.Component {
  render () {
    return (
      <View style={StyleSheet.absoluteFillObject}>
        <Toolbar/>
        <NavWrapper/>
      </View>
    )
  }
}
