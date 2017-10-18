import React from 'react'
import { connect } from 'react-redux'

export default (BaseComponent) => {
  @connect(
    () => ({}),
    dispatch => ({ dispatch })
  )
  class WithActionsComponent extends React.Component {

    restAction = (reducer, action, ...data) => (
      this.props.dispatch({
        rest: [reducer, action.toLowerCase(), ...data],
        payload: { ...data }
      })
    )

    render() {
      return <BaseComponent { ...this.props } restAction={ this.restAction } />
    }

  }

  return WithActionsComponent
}

