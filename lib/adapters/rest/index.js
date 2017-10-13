function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import axios from 'axios';
import { mapValues, get } from 'lodash';
import qs from 'qs';

var paramsSerializer = function paramsSerializer(params) {
  return qs.stringify(params, { arrayFormat: 'brackets' });
};

var call = function call(method, endpoint, params) {
  var _axios;

  return axios((_axios = {
    url: endpoint,
    method: method.toLowerCase()
  }, _defineProperty(_axios, method === 'GET' ? 'params' : 'data', params), _defineProperty(_axios, 'paramsSerializer', paramsSerializer), _defineProperty(_axios, 'timeout', 30 * 1000), _defineProperty(_axios, 'withCredentials', true), _axios)).then(function (response) {
    return response.data;
  }, function (error) {
    var data = get(error, ['response', 'data']);
    if (data) return Promise.reject(data);

    return Promise.reject(error);
  });
};

export default (function (base, endpoints) {
  var index = function index(endpoint) {
    return function (params) {
      return call('GET', '' + base + endpoint, params);
    };
  };
  var create = function create(endpoint) {
    return function (params) {
      return call('POST', '' + base + endpoint, params);
    };
  };
  var update = function update(endpoint) {
    return function (id, params) {
      return call('PATCH', '' + base + endpoint + '/' + id, params);
    };
  };
  var destroy = function destroy(endpoint) {
    return function (id) {
      return call('DELETE', '' + base + endpoint + '/' + id);
    };
  };

  return mapValues(endpoints, function (endpoint) {
    return {
      index: index(endpoint),
      create: create(endpoint),
      update: update(endpoint),
      destroy: destroy(endpoint)
    };
  });
});