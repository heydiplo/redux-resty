import getTypesFor from '../actionTypes'

export default ({ api }) => () => next => (_action) => {
  const { rest, ...action } = _action

  if (!rest) {
    return next(_action)
  }

  const [entity, method, ...params] = rest

  const { START, SUCCESS, FAILURE } = getTypesFor(entity, method.toUpperCase())

  next({ ...action, type: START })

  return api[entity][method](...params)
    .then(
      result => next({ ...action, type: SUCCESS, payload: { ...action.payload, result } }),
      (error) => {
        next({ ...action, type: FAILURE, payload: { ...action.payload, error } })

        throw error
      }
    )
}

