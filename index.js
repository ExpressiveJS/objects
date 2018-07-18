'use strict'

module.exports = {
  expects: expectObjectSchema, // object to object comparison, with initializer
  //expectsOne: expectsOneObjectSchema, // for objects that can be of a couple different types
  //expectsPath: expectsObjectPathSchema // for nested objects

  merge: mergeObjects,
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
