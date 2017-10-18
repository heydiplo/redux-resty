export default (function (_ref) {
  var types = _ref.types,
      api = _ref.api;
  return {

    index: function index(params, hash) {
      return {
        types: types.INDEX,
        promise: api.index(params),
        payload: { params: params, hash: hash }
      };
    },

    create: function create(id, params) {
      return {
        types: types.CREATE,
        promise: api.create(params),
        payload: { params }
      };
    },

    update: function update(id, params) {
      return {
        types: types.UPDATE,
        promise: api.update(id, params),
        payload: { id, params }
      };
    },

    destroy: function destroy(id) {
      return {
        types: types.DESTROY,
        promise: api.delete(id),
        payload: { id: id }
      };
    }

  };
});
