'use strict'

module.exports = {
  expects: expectObjectSchema, // object to object comparison, with initializer
  //expectsOne: expectsOneObjectSchema, // for objects that can be of a couple different types
  //expectsPath: expectsObjectPathSchema // for nested objects

  merge: mergeObjects,
  clone: cloneObject,
}

function expectObjectSchema(obj, initializer, init = true) {
  if (!obj)
    return init ? initializer : undefined

  if (typeof obj !== typeof initializer)
    return init ? initializer : undefined

  if (Array.isArray(initializer) && !Array.isArray(obj))
    return init ? initializer : undefined

  return obj
}

function mergeObjects(obj1, obj2, options) {
  // Merge obj2 into ob1, overwriting any keys.
  // Return new object

  let mergedObj = {}

  for (const key of Object.keys(obj1)) {
    mergedObj[key] = obj1[key]
  }

  for (const key of Object.keys(obj2)) {
    mergedObj[key] = obj2[key]
  }

  return mergedObj
}

function cloneObject(obj) {
  // This function is an attempt to deep clone an object.
  let clone = {}

  for (let prop in obj) {
    if (typeof obj[prop] == 'undefined' || !obj[prop])

      clone[prop] = obj[prop]

    if (typeof obj[prop] == 'object' && Array.isArray(obj[prop])) {

      clone[prop] = Array.from(obj[prop])

    } else if (typeof obj[prop] == 'object') {

      clone[prop] = cloneObject(obj[prop])

    } else if (typeof obj[prop] == 'function') {

      clone[prop] = new Function(`return ${ obj[prop].toString() }`)()

    } else {

      clone[prop] = obj[prop]

    }
  }

  return clone
}
