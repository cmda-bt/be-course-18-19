'use strict'

var fs = require('fs')
var path = require('path')

var db = module.exports

/* Methods. */
db.all = all
db.has = has
db.get = get
db.remove = remove
db.removed = removed
db.set = set
db.add = add

/* Error identifiers. */
db.ERR_MISSING_ENTITY = 1
db.ERR_INVALID_ENTITY = 2
db.ERR_UNEXPECTED_ENTITY = 4
db.ERR_MISSING_ID = 11
db.ERR_INVALID_ID = 12
db.ERR_UNKNOWN_ID = 13
db.ERR_UNEXPECTED_ID = 14
db.ERR_MISSING_NAME = 21
db.ERR_INVALID_NAME = 22
db.ERR_MISSING_TYPE = 31
db.ERR_INVALID_TYPE = 32
db.ERR_UNKNOWN_TYPE = 33
db.ERR_INVALID_DESCRIPTION = 42
db.ERR_MISSING_PLACE = 51
db.ERR_INVALID_PLACE = 52
db.ERR_UNKNOWN_PLACE = 53
db.ERR_MISSING_INTAKE = 61
db.ERR_INVALID_INTAKE = 62
db.ERR_MISSING_SEX = 71
db.ERR_INVALID_SEX = 72
db.ERR_UNKNOWN_SEX = 73
db.ERR_MISSING_AGE = 81
db.ERR_INVALID_AGE = 82
db.ERR_INVALID_WEIGHT = 92
db.ERR_INVALID_SIZE = 101
db.ERR_UNKNOWN_SIZE = 103
db.ERR_INVALID_LENGTH = 112
db.ERR_UNKNOWN_LENGTH = 113
db.ERR_INVALID_COAT = 122
db.ERR_UNKNOWN_COAT = 123
db.ERR_MISSING_VACCINATED = 131
db.ERR_INVALID_VACCINATED = 132
db.ERR_INVALID_DECLAWED = 142
db.ERR_UNEXPECTED_DECLAWED = 144
db.ERR_MISSING_PRIMARY_COLOR = 151
db.ERR_INVALID_PRIMARY_COLOR = 152
db.ERR_INVALID_SECONDARY_COLOR = 162

/* Messages for errors. */
var messages = {}

messages[db.ERR_MISSING_ENTITY] = 'Missing entity'
messages[db.ERR_INVALID_ENTITY] = 'Invalid entity'
messages[db.ERR_UNEXPECTED_ENTITY] = 'Forbidden entity'
messages[db.ERR_MISSING_ID] = 'Missing identifier'
messages[db.ERR_INVALID_ID] = 'Invalid identifier'
messages[db.ERR_UNKNOWN_ID] = 'Unknown identifier'
messages[db.ERR_UNEXPECTED_ID] = 'Forbidden identifier'
messages[db.ERR_MISSING_NAME] = 'Missing name'
messages[db.ERR_INVALID_NAME] = 'Invalid name'
messages[db.ERR_MISSING_TYPE] = 'Missing type'
messages[db.ERR_INVALID_TYPE] = 'Invalid type'
messages[db.ERR_UNKNOWN_TYPE] = 'Unknown type'
messages[db.ERR_MISSING_PLACE] = 'Missing place'
messages[db.ERR_INVALID_DESCRIPTION] = 'Invalid description'
messages[db.ERR_INVALID_PLACE] = 'Invalid place'
messages[db.ERR_UNKNOWN_PLACE] = 'Unknown place'
messages[db.ERR_MISSING_INTAKE] = 'Missing intake'
messages[db.ERR_INVALID_INTAKE] = 'Invalid intake'
messages[db.ERR_MISSING_SEX] = 'Missing sex'
messages[db.ERR_INVALID_SEX] = 'Invalid sex'
messages[db.ERR_UNKNOWN_SEX] = 'Unknown sex'
messages[db.ERR_MISSING_AGE] = 'Missing age'
messages[db.ERR_INVALID_AGE] = 'Invalid age'
messages[db.ERR_INVALID_WEIGHT] = 'Invalid weight'
messages[db.ERR_INVALID_SIZE] = 'Invalid size'
messages[db.ERR_UNKNOWN_SIZE] = 'Unknown size'
messages[db.ERR_INVALID_LENGTH] = 'Invalid length'
messages[db.ERR_UNKNOWN_LENGTH] = 'Unknown length'
messages[db.ERR_INVALID_COAT] = 'Invalid coat'
messages[db.ERR_UNKNOWN_COAT] = 'Unknown coat'
messages[db.ERR_MISSING_VACCINATED] = 'Missing vaccinated'
messages[db.ERR_INVALID_VACCINATED] = 'Invalid vaccinated'
messages[db.ERR_INVALID_DECLAWED] = 'Invalid declawed'
messages[db.ERR_UNEXPECTED_DECLAWED] = 'Forbidden declawed'
messages[db.ERR_MISSING_PRIMARY_COLOR] = 'Missing primary color'
messages[db.ERR_INVALID_PRIMARY_COLOR] = 'Invalid primary color'
messages[db.ERR_INVALID_SECONDARY_COLOR] = 'Invalid secondary color'

/* Error types.  The error codes are set up in such a way that dividing
 * them by 10 and flooring the result will give the type by its index. */
var types = [
  'entity',
  'id',
  'name',
  'type',
  'place',
  'intake',
  'sex',
  'age',
  'weight',
  'size',
  'length',
  'code',
  'vaccinated',
  'declawed',
  'primaryColor',
  'secondaryColor'
]

/* Error categories.  The error codes are set up in such a way that counting
 * their remainder after dividing them by 10 (as in, `err.code % 10`) gives
 * the index of the error category. */
var categories = [
  null,
  'missing',
  'invalid',
  'unknown',
  'unexpected'
]

/* The highest known identifier.  When a new entity is added it will
 * increment this value by one and use that, as a string, for its
 * identifier. */
var highestId = 0

/* An index of entities by their identifier.  An object is fine for this,
 * as all identifiers are integers.
 * Entities that used to exist but are since removed  are set to undefined,
 * but their identifier is still a property of this index. */
var byId = {}

/* A list of ordered known identifiers including ones that were removed. */
var byIndex = []

/* Insert all entities into their indices and set `highestId`. */
;(function (buf) {
  var data = JSON.parse(buf)
  var length = data.length
  var index = -1
  var entity
  var id

  while (++index < length) {
    entity = data[index]
    id = entity.id
    byId[id] = entity
    byIndex[index] = id

    id = Number(id)

    if (id > highestId) {
      highestId = id
    }
  }

  data = undefined
})(fs.readFileSync(path.join(__dirname, 'data.json')))

/* Get all entities. */
function all() {
  var result = []
  var length = byIndex.length
  var index = -1
  var data

  while (++index < length) {
    data = byId[byIndex[index]]

    if (data) {
      result.push(Object.assign({}, data))
    }
  }

  return result
}

/* Check if an entity exists (and has not been removed). */
function has(id) {
  validateId(id)
  return byId[id] !== undefined
}

/* Get an entity. */
function get(id) {
  return has(id) ? Object.assign({}, byId[id]) : undefined
}

/* Remove an entity. */
function remove(id) {
  if (!has(id)) {
    fail(db.ERR_UNKNOWN_ID)
  }

  byId[id] = undefined
}

/* Check if an entity is removed. */
function removed(id) {
  validateId(id)
  return id in byId && byId[id] === undefined
}

/* Set an entity.  Only works if the entity exists and has not been removed. */
function set(data) {
  var id

  required(data, db.ERR_MISSING_ENTITY)
  object(data, db.ERR_INVALID_ENTITY)

  validate(data)
  id = data.id

  if (removed(id)) {
    fail(db.ERR_UNEXPECTED_ENTITY)
  }

  if (!has(id)) {
    byIndex.push(id)
  }

  byId[id] = Object.assign({}, data)
}

/* Add an entity.  Only works if the there is no identifier in the entity. */
function add(data) {
  var id

  required(data, db.ERR_MISSING_ENTITY)
  object(data, db.ERR_INVALID_ENTITY)

  id = data.id

  if (id !== null && id !== undefined) {
    fail(db.ERR_UNEXPECTED_ID)
  }

  data = Object.assign({}, data)
  id = String(++highestId)

  data.id = id

  validate(data)

  byId[id] = data
  byIndex.push(id)

  return data
}

/* Validate an entity. */
function validate(data) {
  validateId(data.id)

  required(data.name, db.ERR_MISSING_NAME)
  string(data.name, db.ERR_INVALID_NAME)
  filled(data.name, db.ERR_INVALID_NAME)

  required(data.type, db.ERR_MISSING_TYPE)
  string(data.type, db.ERR_INVALID_TYPE)
  enumerate(data.type, db.ERR_UNKNOWN_TYPE, ['cat', 'dog', 'rabbit'])

  if (data.description !== null && data.description !== undefined) {
    string(data.description, db.ERR_INVALID_DESCRIPTION)
  }

  required(data.place, db.ERR_MISSING_PLACE)
  string(data.place, db.ERR_INVALID_PLACE)
  enumerate(data.place, db.ERR_UNKNOWN_PLACE, [
    'Brooklyn Animal Care Center',
    'Manhattan Animal Care Center',
    'Staten Island Animal Care Center'
  ])

  required(data.intake, db.ERR_MISSING_INTAKE)
  string(data.intake, db.ERR_INVALID_INTAKE)
  date(data.intake, db.ERR_INVALID_INTAKE)

  required(data.sex, db.ERR_MISSING_SEX)
  string(data.sex, db.ERR_INVALID_SEX)
  enumerate(data.sex, db.ERR_UNKNOWN_SEX, ['male', 'female'])

  required(data.age, db.ERR_MISSING_AGE)
  number(data.age, db.ERR_INVALID_AGE)

  if (data.weight !== null && data.weight !== undefined) {
    number(data.weight, db.ERR_INVALID_WEIGHT)
  }

  if (data.size !== null && data.size !== undefined) {
    string(data.size, db.ERR_INVALID_SIZE)
    enumerate(data.size, db.ERR_UNKNOWN_SIZE, ['small', 'medium', 'large'])
  }

  if (data.length !== null && data.length !== undefined) {
    string(data.length, db.ERR_INVALID_LENGTH)
    enumerate(data.length, db.ERR_UNKNOWN_LENGTH, ['short', 'medium', 'long'])
  }

  if (data.coat !== null && data.coat !== undefined) {
    string(data.coat, db.ERR_INVALID_COAT)
    enumerate(data.coat, db.ERR_UNKNOWN_COAT, ['smooth', 'thick'])
  }

  required(data.vaccinated, db.ERR_MISSING_VACCINATED)
  boolean(data.vaccinated, db.ERR_INVALID_VACCINATED)

  if (data.declawed !== null && data.declawed !== undefined) {
    if (data.type === 'cat') {
      boolean(data.declawed, db.ERR_INVALID_DECLAWED)
    } else {
      fail(db.ERR_UNEXPECTED_DECLAWED)
    }
  }

  required(data.primaryColor, db.ERR_MISSING_PRIMARY_COLOR)
  string(data.primaryColor, db.ERR_INVALID_PRIMARY_COLOR)
  filled(data.primaryColor, db.ERR_INVALID_PRIMARY_COLOR)

  if (data.secondaryColor !== null && data.secondaryColor !== undefined) {
    string(data.secondaryColor, db.ERR_INVALID_SECONDARY_COLOR)
    filled(data.secondaryColor, db.ERR_INVALID_SECONDARY_COLOR)
  }
}

function validateId(id) {
  var val = parseInt(id, 10)

  required(id, db.ERR_MISSING_ID)
  string(id, db.ERR_INVALID_ID)
  filled(id, db.ERR_INVALID_ID)

  // eslint-disable-next-line no-self-compare
  if (String(val) !== id || val === 0 || val !== val || val === Infinity || val === -Infinity) {
    fail(db.ERR_INVALID_ID)
  }
}

function required(value, code) {
  if (value === null || value === undefined) {
    fail(code)
  }
}

function enumerate(value, code, list) {
  if (list.indexOf(value) === -1) {
    fail(code)
  }
}

function object(value, code) {
  if (typeof value !== 'object') {
    fail(code)
  }
}

function number(value, code) {
  if (typeof value !== 'number' || isNaN(value)) {
    fail(code)
  }
}

function boolean(value, code) {
  if (typeof value !== 'boolean') {
    fail(code)
  }
}

function string(value, code) {
  if (typeof value !== 'string') {
    fail(code)
  }
}

function filled(value, code) {
  if (value === '') {
    fail(code)
  }
}

function date(value, code) {
  var year = parseInt(value.slice(0, 4), 10)
  var month = parseInt(value.slice(5, 7), 10)
  var day = parseInt(value.slice(8), 10)
  var length = value.length
  var index = 0
  var char

  while (++index < length) {
    char = value.charCodeAt(index)
    if (index === 4 || index === 7) {
      if (char !== 45 /* '-' */) {
        fail(code)
      }
    } else if (char < 48 /* '0' */ || char > 57 /* '9' */) {
      fail(code)
    }
  }

  if (length !== 10 || year < 1970 || month < 1 || month > 12 || day < 1 || day > 31) {
    fail(code)
  }
}

function fail(code) {
  var err = new Error(messages[code])
  err.code = code
  err.type = types[Math.floor(code / 10)]
  err.category = categories[code % 10]
  throw err
}
