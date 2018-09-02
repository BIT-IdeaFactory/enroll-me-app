export default (state = { ab: 'A', half: 1, dayCard: 0 }, action) => {
  switch (action.type) {
    case 'TOGGLE_A_B':
      return {
        ...state,
        ab: state.ab === 'A' ? 'B' : 'A'
      }
    case 'TOGGLE_FIRST_SECOND':
      return {
        ...state,
        half: 3 - state.half
      }
    case 'SET_LAST_SELECTED_DAY':
      return {
        ...state,
        dayCard: action.dayCard
      }
    default:
      return state
  }
}
