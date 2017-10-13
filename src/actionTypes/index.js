const asyncAction = name => ({
  START: `${name}.START`,
  SUCCESS: `${name}.SUCCESS`,
  FAILURE: `${name}.FAILURE`
})

const getTypesFor = (entity, action) => {
  if (!action) {
    return {
      INDEX: getTypesFor(entity, 'INDEX'),
      CREATE: getTypesFor(entity, 'CREATE'),
      UPDATE: getTypesFor(entity, 'UPDATE'),
      DESTROY: getTypesFor(entity, 'DESTROY'),
    }
  }

  return asyncAction(`${entity}.${action}`)
}

export default getTypesFor
