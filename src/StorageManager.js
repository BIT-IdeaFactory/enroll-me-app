import { AsyncStorage, Alert } from 'react-native'

const dataStoreKeyword = "@enrollments_data:store";
const selectionStoreKeyword = "@enrollments_selection:store";

export default {
  saveEnrollment: async (key, struct) => {
    try {
      await AsyncStorage.setItem(`${dataStoreKeyword}${key}`, JSON.stringify(struct));
      Alert.alert("Saved!")
    } catch (error){
      Alert.alert("Error")
    }
  },
  removeEnrollment: () => {},

  getAllEnrollments: () => {},

  getSelection: () => {},

  changeSelection: () => {},

}