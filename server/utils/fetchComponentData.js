
export function fetchComponentData(dispatch, components, params) {
  let actions = [];
  components.forEach(component => {
    let needs = component.needs || (component.WrappedComponent && component.WrappedComponent.needs)
    if (needs && needs.length) {
      needs.forEach(action => {
        if (actions.indexOf(action) === -1) {
          actions.push(action)
        }
      })
    }
  })
  const promises = actions.map(action => dispatch(action(params)))
  return Promise.all(promises)
}
