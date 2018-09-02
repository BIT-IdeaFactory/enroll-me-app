/** @format */

import * as React from 'react'
import { ActivityIndicator, AppRegistry, View, StyleSheet } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './src/configureStore'

const { store, persistor } = configureStore()
export default function Main () {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingView/>} persistor={persistor}>
        <PaperProvider>
          <App />
        </PaperProvider>
      </PersistGate>
    </Provider>
  )
}

class LoadingView extends React.Component {
  render () {
    return <View style={styles.container} >
      <ActivityIndicator/>
    </View>
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})

AppRegistry.registerComponent(appName, () => Main)
