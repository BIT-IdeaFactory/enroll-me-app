export default (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_ENROLLMENT_SELECTION':
      if (state.indexOf(action.id === -1)) {
        return [
          ...state,
          action.id
        ];
      } else {
        return state.filter(i => i !== action.id);
      }
    case 'ADD_SELECTION':
      return action.selection;
    default:
      return state
  }
}