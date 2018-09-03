export default (state = { ab: null, dayCard: 0 }, action) => {
  switch (action.type) {
    case 'TOGGLE_A_B':
      return {
        ...state,
        ab: state.ab === 'A' ? 'B' : state.ab === 'B' ? null : 'A'
      }
    case 'SET_LAST_SELECTED_CARD':
      return {
        ...state,
        dayCard: action.dayCard
      }
    default:
      return state
  }
}
