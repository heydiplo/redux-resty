import { handleActions } from 'redux-actions'
import { filter, map, reduce, without } from 'lodash'
import getTypesFor from '../actionTypes'

const initialState = {
  queries: {},
  data: {}
}

const toHash = response => reduce(response, (result, item) => {
  result[item.id] = item // eslint-disable-line no-param-reassign

  return result
}, {})

export default (entity) => {
  const types = getTypesFor(entity)

  return handleActions({
    [types.INDEX.START]: (state, { payload: { hash } }) => ({
      ...state,
      queries: {
        ...state.queries,
        [hash]: {
          loading: true
        }
      }
    }),

    [types.INDEX.SUCCESS]: (state, { payload: { result, hash } }) => ({
      data: {
        ...state.data,
        ...toHash(result)
      },
      queries: {
        ...state.queries,
        [hash]: {
          error: false,
          loading: false,
          ids: map(result, 'id')
        }
      }
    }),

    [types.INDEX.ERROR]: (state, { payload: { error, hash } }) => ({
      ...state,
      queries: {
        ...state.queries,
        [hash]: {
          ids: null,
          loading: false,
          error
        }
      }
    }),

    [types.CREATE.SUCCESS]: (state, { payload: { result } }) => ({
      queries: {},
      data: {
        ...state.data,
        [result.id]: ({
          ...state.data[result.id],
          result
        })
      }
    }),

    [types.UPDATE.SUCCESS]: (state, { payload: { result } }) => ({
      queries: {},
      data: {
        ...state.data,
        [result.id]: ({
          ...state.data[result.id],
          result
        })
      }
    }),

    [types.DESTROY.SUCCESS]: (state, { payload: { id } }) => ({
      queries: map(state.queries, query => ({
        ...query,
        ids: without(query.ids, id)
      })),
      data: filter(state.data, item => item.id !== id)
    })
  }, { ...initialState })
}
