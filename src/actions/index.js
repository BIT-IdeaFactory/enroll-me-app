export const toggleEnrollmentSelection = enrollmentID => ({
  type: 'TOGGLE_ENROLLMENT_SELECTION',
  id: enrollmentID,
})

export const removeEnrollmentFromSelection = enrollmentID => ({
  type: 'REMOVE_ENROLLMENT_SELECTION',
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

export const loadData = data => ({
  type: 'ADD_DATA',
  data
})

export const loadSelection = selection => ({
  type: 'ADD_SELECTION',
  selection
})