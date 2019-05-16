export default function combineReducers(reducers) {
  return function combine(state = {}, action) {
    const newState = {}
    let hasChanged = false

    for (const key in reducers) {
      const reducer = reducers[key]
      const prevStateForKey = state[key]
      const nextStateForKey = reducer(state[key], action)

      newState[key] = nextStateForKey
      hasChanged = hasChanged || prevStateForKey !== nextStateForKey
    }

    return hasChanged ? newState : state
  }
}