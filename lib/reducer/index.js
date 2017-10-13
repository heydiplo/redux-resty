var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { handleActions } from 'redux-actions';
import { filter, map, reduce, without } from 'lodash';
import getTypesFor from '../actionTypes';

var initialState = {
  queries: {},
  data: {}
};

var toHash = function toHash(response) {
  return reduce(response, function (result, item) {
    result[item.id] = item; // eslint-disable-line no-param-reassign

    return result;
  }, {});
};

export default (function (entity) {
  var _handleActions;

  var types = getTypesFor(entity);

  return handleActions((_handleActions = {}, _defineProperty(_handleActions, types.INDEX.START, function (state, _ref) {
    var hash = _ref.payload.hash;
    return _extends({}, state, {
      queries: _extends({}, state.queries, _defineProperty({}, hash, {
        loading: true
      }))
    });
  }), _defineProperty(_handleActions, types.INDEX.SUCCESS, function (state, _ref2) {
    var _ref2$payload = _ref2.payload,
        result = _ref2$payload.result,
        hash = _ref2$payload.hash;
    return {
      data: _extends({}, state.data, toHash(result)),
      queries: _extends({}, state.queries, _defineProperty({}, hash, {
        error: false,
        loading: false,
        ids: map(result, 'id')
      }))
    };
  }), _defineProperty(_handleActions, types.INDEX.ERROR, function (state, _ref3) {
    var _ref3$payload = _ref3.payload,
        error = _ref3$payload.error,
        hash = _ref3$payload.hash;
    return _extends({}, state, {
      queries: _extends({}, state.queries, _defineProperty({}, hash, {
        ids: null,
        loading: false,
        error: error
      }))
    });
  }), _defineProperty(_handleActions, types.CREATE.SUCCESS, function (state, _ref4) {
    var result = _ref4.payload.result;
    return {
      queries: {},
      data: _extends({}, state.data, _defineProperty({}, result.id, _extends({}, state.data[result.id], {
        result: result
      })))
    };
  }), _defineProperty(_handleActions, types.UPDATE.SUCCESS, function (state, _ref5) {
    var result = _ref5.payload.result;
    return {
      queries: {},
      data: _extends({}, state.data, _defineProperty({}, result.id, _extends({}, state.data[result.id], {
        result: result
      })))
    };
  }), _defineProperty(_handleActions, types.DESTROY.SUCCESS, function (state, _ref6) {
    var id = _ref6.payload.id;
    return {
      queries: map(state.queries, function (query) {
        return _extends({}, query, {
          ids: without(query.ids, id)
        });
      }),
      data: filter(state.data, function (item) {
        return item.id !== id;
      })
    };
  }), _handleActions), _extends({}, initialState));
});