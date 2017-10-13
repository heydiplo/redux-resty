import axios from 'axios'
import { mapValues, get } from 'lodash'
import qs from 'qs'

const paramsSerializer = params => qs.stringify(params, { arrayFormat: 'brackets' })

const call = (method, endpoint, params) => axios({
  url: endpoint,
  method: method.toLowerCase(),
  [method === 'GET' ? 'params' : 'data']: params,
  paramsSerializer,
  timeout: 30 * 1000,
  withCredentials: true
})
  .then(
    response => response.data,
    (error) => {
      const data = get(error, ['response', 'data'])
      if (data) return Promise.reject(data)

      return Promise.reject(error)
    }
  )


export default (base, endpoints) => {
  const index = endpoint => params => call('GET', `${base}${endpoint}`, params)
  const create = endpoint => params => call('POST', `${base}${endpoint}`, params)
  const update = endpoint => (id, params) => call('PATCH', `${base}${endpoint}/${id}`, params)
  const destroy = endpoint => id => call('DELETE', `${base}${endpoint}/${id}`)

  return mapValues(endpoints, endpoint => ({
    index: index(endpoint),
    create: create(endpoint),
    update: update(endpoint),
    destroy: destroy(endpoint)
  }))
}
