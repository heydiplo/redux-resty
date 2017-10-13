var asyncAction = function asyncAction(name) {
  return {
    START: name + '.START',
    SUCCESS: name + '.SUCCESS',
    FAILURE: name + '.FAILURE'
  };
};

var getTypesFor = function getTypesFor(entity, action) {
  if (!action) {
    return {
      INDEX: getTypesFor(entity, 'INDEX'),
      CREATE: getTypesFor(entity, 'CREATE'),
      UPDATE: getTypesFor(entity, 'UPDATE'),
      DESTROY: getTypesFor(entity, 'DESTROY')
    };
  }

  return asyncAction(entity + '.' + action);
};

export default getTypesFor;