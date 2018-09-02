export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_ENROLLMENT_DATA':
      return [
        ...state,
        action.data
      ]
    case 'REMOVE_ENROLLMENT_DATA':
      return state.filter(i => i.id !== action.id)
    case 'ADD_DATA':
      return action.data
    default:
      return state
  }
}
