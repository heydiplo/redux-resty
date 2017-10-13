var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { connect } from 'react-redux';
import { each, mapValues, map } from 'lodash';

var getParamsHash = function getParamsHash(params) {
  return JSON.stringify(params);
};

var getData = function getData(state, reducer, params) {
  var hash = getParamsHash(params);
  var query = state[reducer].queries[hash];

  return {
    data: query && query.ids && map(query.ids, function (id) {
      return state[reducer].data[id];
    }),
    loading: query && query.loading,
    error: query && query.error,
    params: params,
    hash: hash
  };
};

export default (function (entities) {
  return function (BaseComponent) {
    var _dec, _class;

    var mapStateToProps = function mapStateToProps(state, props) {
      var result = {};

      each(entities, function (_ref, key) {
        var _ref2 = _slicedToArray(_ref, 2),
            reducer = _ref2[0],
            getParams = _ref2[1];

        var params = getParams(props);

        if (params !== undefined) {
          result[key] = getData(state, reducer, params);
        }
      });

      return result;
    };

    var LoadingComponent = (_dec = connect(mapStateToProps, function (dispatch) {
      return { dispatch: dispatch };
    }), _dec(_class = function (_React$Component) {
      _inherits(LoadingComponent, _React$Component);

      function LoadingComponent() {
        _classCallCheck(this, LoadingComponent);

        return _possibleConstructorReturn(this, (LoadingComponent.__proto__ || Object.getPrototypeOf(LoadingComponent)).apply(this, arguments));
      }

      _createClass(LoadingComponent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.loadIfNecessary();
        }
      }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
          this.loadIfNecessary();
        }
      }, {
        key: 'loadIfNecessary',
        value: function loadIfNecessary() {
          var _this2 = this;

          var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

          map(entities, function (options, key) {
            var entity = _this2.props[key];

            if (entity === undefined) return false;

            var data = entity.data,
                loading = entity.loading,
                error = entity.error,
                params = entity.params,
                hash = entity.hash;


            if (!data && !loading && (!error || force)) {
              _this2.props.dispatch({
                rest: [key, 'index', params],
                payload: { params: params, hash: hash }
              });
            }
          });
        }
      }, {
        key: 'render',
        value: function render() {
          var _this3 = this;

          var status = _extends({}, this.props.status, mapValues(entities, function (_, key) {
            if (!_this3.props[key]) return 'idle';
            if (_this3.props[key].data) return 'ready';
            if (_this3.props[key].error) return 'error';
            if (_this3.props[key].loading) return 'loading';
          }));

          var data = mapValues(entities, function (_, key) {
            return _this3.props[key] && _this3.props[key].data;
          });

          return React.createElement(BaseComponent, _extends({}, this.props, data, {
            status: status
          }));
        }
      }]);

      return LoadingComponent;
    }(React.Component)) || _class);


    return LoadingComponent;
  };
});