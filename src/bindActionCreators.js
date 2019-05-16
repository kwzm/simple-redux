function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments))
  }
}

export default function bindActionCreators(actionCreators, dispatch) {
  const bindActionCreators = []

  for (const key in actionCreators) {
    const actionCreator = actionCreators[key]

    bindActionCreators[key] = bindActionCreator(actionCreator, dispatch)
  }

  return bindActionCreators
}