export default function combineReducers(reducers) {
  return function combine(state = {}, action) {
    const newState = {}
    let hasChanged = false

    for (key in reducers) {
      const prevStateForKey = state[key]
      const nextStateForKey = reducers(state[key], action)

      newState[key] = nextStateForKey
      hasChanged = hasChanged || prevStateForKey !== nextStateForKey
    }

    return hasChanged ? newState : state
  }
}