import ActionTypes from './utils/actionTypes'

export default function createStore(reducer, preloadedState, enhancer) {
  if (enhancer !== undefined && typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, preloadedState)
  }
  
  let currentState = preloadedState
  let currentReducer = reducer
  let currentListeners = []
  
  function getState() {
    return currentState
  }

  function dispatch(action) {
    currentState = currentReducer(currentState, action)

    currentListeners.forEach(listener => {
      listener()
    })

    return action
  }

  function subscribe(listener) {
    let isSubscribed = true

    currentListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return 
      }

      isSubscribed = false

      const index = currentListeners.indexOf(listener)
      
      currentListeners.splice(index, 1)
    }
  }

  function replaceReducer(nextReducer) {
    currentReducer = nextReducer

    dispatch({ type: ActionTypes.REPLACE })
  }

  return {
    getState,
    dispatch,
    subscribe,
    replaceReducer
  }
}