var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { connect } from 'react-redux';

export default (function (BaseComponent) {
  var _dec, _class;

  var WithActionsComponent = (_dec = connect(function () {
    return {};
  }, function (dispatch) {
    return { dispatch: dispatch };
  }), _dec(_class = function (_React$Component) {
    _inherits(WithActionsComponent, _React$Component);

    function WithActionsComponent() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, WithActionsComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WithActionsComponent.__proto__ || Object.getPrototypeOf(WithActionsComponent)).call.apply(_ref, [this].concat(args))), _this), _this.restAction = function (reducer, action) {
        for (var _len2 = arguments.length, data = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          data[_key2 - 2] = arguments[_key2];
        }

        return _this.props.dispatch({
          rest: [reducer, action.toLowerCase()].concat(data),
          payload: _extends({}, data)
        });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(WithActionsComponent, [{
      key: 'render',
      value: function render() {
        return React.createElement(BaseComponent, _extends({}, this.props, { restAction: this.restAction }));
      }
    }]);

    return WithActionsComponent;
  }(React.Component)) || _class);


  return WithActionsComponent;
});