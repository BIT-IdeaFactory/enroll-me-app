export default (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_ENROLLMENT_SELECTION':
      if (state.includes(action.id)) {
        return state.filter(i => i !== action.id)
      } else {
        return [
          ...state,
          action.id
        ]
      }
    case 'ADD_SELECTION':
      return action.selection
    default:
      return state
  }
}
