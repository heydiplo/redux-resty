import React from 'react'
import { connect } from 'react-redux'
import { each, mapValues, map } from 'lodash'

const getParamsHash = params => JSON.stringify(params)

const getData = (state, reducer, params) => {
  const hash = getParamsHash(params)
  const query = state[reducer].queries[hash]

  return {
    data: query && query.ids && map(query.ids, id => state[reducer].data[id]),
    loading: query && query.loading,
    error: query && query.error,
    params,
    hash
  }
}

export default entities => (BaseComponent) => {
  const mapStateToProps = (state, props) => {
    const result = {}

    each(entities, ([reducer, getParams], key) => {
      const params = getParams(props)

      if (params !== undefined) {
        result[key] = getData(state, reducer, params)
      }
    })

    return result
  }

  @connect(mapStateToProps, dispatch => ({ dispatch }))
  class LoadingComponent extends React.Component {

    componentWillMount() {
      this.loadIfNecessary()
    }

    componentDidUpdate() {
      this.loadIfNecessary()
    }

    loadIfNecessary(force = false) {
      map(entities, (options, key) => {
        const entity = this.props[key]

        if (entity === undefined) return false

        const { data, loading, error, params, hash } = entity

        if (!data && !loading && (!error || force)) {
          this.props.dispatch({
            rest: [key, 'index', params],
            payload: { params, hash }
          })
        }
      })
    }

    render() {
      const status = {
        ...this.props.status,
        ...mapValues(entities, (_, key) => {
          if (!this.props[key]) return 'idle'
          if (this.props[key].data) return 'ready'
          if (this.props[key].error) return 'error'
          if (this.props[key].loading) return 'loading'
        })
      }

      const data = mapValues(entities, (_, key) => (
        this.props[key] && this.props[key].data
      ))

      return (
        <BaseComponent
          { ...this.props }
          { ...data }
          status={ status }
        />
      )
    }

  }

  return LoadingComponent
}
