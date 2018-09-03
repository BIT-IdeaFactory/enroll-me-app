export const toggleEnrollmentSelection = enrollmentID => ({
  type: 'TOGGLE_ENROLLMENT_SELECTION',
  id: enrollmentID
})
export const addEnrollmentToData = data => ({
  type: 'ADD_ENROLLMENT_DATA',
  data
})

export const removeEnrollmentFromData = enrollmentID => ({
  type: 'REMOVE_ENROLLMENT_DATA',
  id: enrollmentID
})

export const toggleAB = () => ({
  type: 'TOGGLE_A_B'
})

export const setLastSelectedDay = idx => ({
  type: 'SET_LAST_SELECTED_CARD',
  dayCard: idx
})
