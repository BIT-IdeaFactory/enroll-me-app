import { AsyncStorage, Alert } from 'react-native'

const keyword = "__ENROLLMENTDATA__"

export default {
  save: async (key, struct) => {
    try {
      await AsyncStorage.setItem(`${keyword}${key}`, JSON.stringify(struct));
      Alert.alert("Saved!")
    } catch (error) {
      Alert.alert("Error")
    }
  }
  ,
  getKeys: async () => {
    const keys = await AsyncStorage.getAllKeys();
    return keys.filter(x => x.startsWith(keyword)).map(i => i.replace(keyword, ""))
  },
  getByKey: key => AsyncStorage.getItem(`${keyword}${key}`)
}