export const HeroReducer = (state = { stats: { health: 100 }}, action) => {
  switch (action.type) {
    case 'INITIALIZE_HERO':
      return action.hero

    default:
      return state
  }
}
