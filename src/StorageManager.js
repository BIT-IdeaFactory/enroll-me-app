import { AsyncStorage } from 'react-native'

export default {
  save: (name, struct) => AsyncStorage.setItem(name, struct),
  getKeys:  () => AsyncStorage.getAllKeys(),
  getByKey: key => AsyncStorage.getItem(key)
}