import { handleActions } from 'redux-actions'
import { map, mapValues, reduce, without, omitBy } from 'lodash'
import getTypesFor from '../actionTypes'
import { getParamsHash } from '../decorator'

const initialState = {
  queries: {},
  data: {}
}

const toHash = response => reduce(response, (result, item) => {
  result[item.id] = item // eslint-disable-line no-param-reassign

  return result
}, {})

const emptyQuery = getParamsHash({})

const DEFAULT_OPTIONS = {
  handleRecord: record => record
}

export default (entity, options) => {
  const types = getTypesFor(entity)
  const {
    handleRecord
  } = { ...DEFAULT_OPTIONS, ...options }

  console.log(options, handleRecord)

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
      ...state,
      data: {
        ...state.data,
        ...toHash(map(result, handleRecord))
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
      ...state,
      queries: {
        ...state.queries,
        [emptyQuery]: state.queries[emptyQuery].ids ? {
          ...state.queries[emptyQuery],
          ids: [result.id, ...state.queries[emptyQuery].ids]
        } : undefined
      },
      data: {
        ...state.data,
        [result.id]: ({
          ...state.data[result.id],
          ...handleRecord(result)
        })
      }
    }),

    [types.UPDATE.SUCCESS]: (state, { payload: { result } }) => ({
      ...state,
      data: {
        ...state.data,
        [result.id]: ({
          ...state.data[result.id],
          ...handleRecord(result)
        })
      }
    }),

    [types.DESTROY.SUCCESS]: (state, { payload: { 0: id } }) => ({
      ...state,
      queries: mapValues(state.queries, query => ({
        ...query,
        ids: without(query.ids, id)
      })),
      data: omitBy(state.data, item => item.id === id)
    })
  }, { ...initialState })
}
