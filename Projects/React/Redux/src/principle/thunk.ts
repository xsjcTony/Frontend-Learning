const thunk = (store) => {
  store.dispatch = (action) => {
    if (typeof action === 'function') {
      action(store.dispatch, store.getState)
    } else {
      store.dispatch(action)
    }
  }
}
