var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import getTypesFor from '../actionTypes';

export default (function (_ref) {
  var api = _ref.api;
  return function () {
    return function (next) {
      return function (_action) {
        var _api$entity;

        var rest = _action.rest,
            action = _objectWithoutProperties(_action, ['rest']);

        if (!rest) {
          return next(_action);
        }

        var _rest = _toArray(rest),
            entity = _rest[0],
            method = _rest[1],
            params = _rest.slice(2);

        var _getTypesFor = getTypesFor(entity, method.toUpperCase()),
            START = _getTypesFor.START,
            SUCCESS = _getTypesFor.SUCCESS,
            FAILURE = _getTypesFor.FAILURE;

        next(_extends({}, action, { type: START }));

        return (_api$entity = api[entity])[method].apply(_api$entity, _toConsumableArray(params)).then(function (result) {
          return next(_extends({}, action, { type: SUCCESS, payload: _extends({}, action.payload, { result: result }) }));
        }, function (error) {
          next(_extends({}, action, { type: FAILURE, payload: _extends({}, action.payload, { error: error }) }));

          throw error;
        });
      };
    };
  };
});