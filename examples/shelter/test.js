'use strict'

/* eslint-disable complexity */

var test = require('tape')
var db = require('./db')

var ids = db.all().map(d => d.id)

test('db', function (t) {
  t.test('.all', function (st) {
    st.equal(typeof db.all, 'function', 'should be a function')
    st.ok(Array.isArray(db.all()), 'should return an array')
    st.equal(typeof db.all()[0], 'object', 'should return a list of objects')
    st.equal(typeof db.all()[0].id, 'string', 'should return objects with identifiers')

    var id = ids.pop()
    db.remove(id)
    st.equal(db.all().map(d => d.id).indexOf(id), -1, 'should not return removed entities')

    st.end()
  })

  t.test('.has', function (st) {
    var id = ids[0]

    st.plan(8)

    st.equal(typeof db.has, 'function', 'should be a function')
    st.equal(db.has(id), true, 'should return true if an id does exist')
    st.equal(db.has('1234'), false, 'should return false if an id does not exist')

    id = ids.pop()
    db.remove(id)
    st.equal(db.has(id), false, 'should return false if an id is removed')

    try {
      db.has()
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_ID, 'should throw `ERR_MISSING_ID` if no id is given')
    }

    try {
      db.has('')
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_ID, 'should throw `ERR_INVALID_ID` if id is an empty')
    }

    try {
      db.has(1234)
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_ID, 'should throw `ERR_INVALID_ID` if id is an invalid type')
    }

    try {
      db.has('0')
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_ID, 'should throw `ERR_INVALID_ID` if id is otherwise not valid')
    }
  })

  t.test('.get', function (st) {
    var id = ids[0]

    st.plan(9)

    st.equal(typeof db.get, 'function', 'should be a function')
    st.equal(typeof db.get(id), 'object', 'should return objects if an id does exist')
    st.equal(db.get(id).id, id, 'should return objects with identifiers if an id does exist')
    st.equal(db.get('1234'), undefined, 'should return undefined if an id does not exist')

    id = ids.pop()
    db.remove(id)
    st.equal(db.get(id), undefined, 'should return undefined if an id is removed')

    try {
      db.get()
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_ID, 'should throw `ERR_MISSING_ID` if no id is given')
    }

    try {
      db.get('')
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_ID, 'should throw `ERR_INVALID_ID` if id is an empty')
    }

    try {
      db.get(1234)
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_ID, 'should throw `ERR_INVALID_ID` if id is an invalid type')
    }

    try {
      db.get('0')
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_ID, 'should throw `ERR_INVALID_ID` if id is otherwise not valid')
    }
  })

  t.test('.remove', function (st) {
    var id = ids.pop()

    st.plan(8)

    st.equal(typeof db.remove, 'function', 'should be a function')
    st.equal(db.remove(id), undefined, 'should return undefined if an id is removed')

    try {
      db.remove()
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_ID, 'should throw `ERR_MISSING_ID` if no id is given')
    }

    try {
      db.remove('')
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_ID, 'should throw `ERR_INVALID_ID` if id is an empty')
    }

    try {
      db.remove(1234)
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_ID, 'should throw `ERR_INVALID_ID` if id is an invalid type')
    }

    try {
      db.remove('0')
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_ID, 'should throw `ERR_INVALID_ID` if id is otherwise not valid')
    }

    id = ids.pop()
    db.remove(id)

    try {
      db.remove(id)
    } catch (err) {
      st.equal(err.code, db.ERR_UNKNOWN_ID, 'should throw `ERR_UNKNOWN_ID` if id is already removed')
    }

    try {
      db.remove('1234')
    } catch (err) {
      st.equal(err.code, db.ERR_UNKNOWN_ID, 'should throw `ERR_UNKNOWN_ID` if id never existed')
    }
  })

  t.test('.removed', function (st) {
    var id = ids.pop()

    st.plan(8)

    st.equal(typeof db.remove, 'function', 'should be a function')
    st.equal(db.removed(id), false, 'should return false if an id is not removed')
    st.equal(db.removed('1234'), false, 'should return false if an id never existed')
    db.remove(id)
    st.equal(db.removed(id), true, 'should return true if an id is removed')

    try {
      db.removed()
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_ID, 'should throw `ERR_MISSING_ID` if no id is given')
    }

    try {
      db.removed('')
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_ID, 'should throw `ERR_INVALID_ID` if id is an empty')
    }

    try {
      db.removed(1234)
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_ID, 'should throw `ERR_INVALID_ID` if id is an invalid type')
    }

    try {
      db.removed('0')
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_ID, 'should throw `ERR_INVALID_ID` if id is otherwise not valid')
    }
  })

  t.test('.set', function (st) {
    var entity = db.all()[0]

    st.plan(53)

    st.equal(typeof db.set, 'function', 'should be a function')

    st.equal(
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated, primaryColor: entity.primaryColor}),
      undefined,
      'should return undefined if successful'
    )

    st.equal(
      db.set({id: '1234', name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated, primaryColor: entity.primaryColor}),
      undefined,
      'should return undefined for an new entity'
    )

    entity = db.get(ids.pop())
    db.remove(entity.id)

    try {
      db.set(entity)
    } catch (err) {
      st.equal(err.code, db.ERR_UNEXPECTED_ENTITY, 'should throw `ERR_UNEXPECTED_ENTITY` if a removed entity is given')
    }

    /* Entity. */

    try {
      db.set()
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_ENTITY, 'should throw `ERR_MISSING_ENTITY` if no entity is given')
    }

    try {
      db.set('1234')
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_ENTITY, 'should throw `ERR_INVALID_ENTITY` if an invalid entity is given')
    }

    /* Identifier. */

    try {
      db.set({})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_ID, 'should throw `ERR_MISSING_ID` if no id is given')
    }

    try {
      db.set({id: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_ID, 'should throw `ERR_INVALID_ID` if an invalid id is given')
    }

    /* Name. */

    try {
      db.set({id: entity.id})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_NAME, 'should throw `ERR_MISSING_NAME` if no name is given')
    }

    try {
      db.set({id: entity.id, name: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_NAME, 'should throw `ERR_INVALID_NAME` if an invalid name is given')
    }

    /* Type. */

    try {
      db.set({id: entity.id, name: entity.name})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_TYPE, 'should throw `ERR_MISSING_TYPE` if no type is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_TYPE, 'should throw `ERR_INVALID_TYPE` if an invalid type is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: 'duck'})
    } catch (err) {
      st.equal(err.code, db.ERR_UNKNOWN_TYPE, 'should throw `ERR_UNKNOWN_TYPE` if an unknown type is given')
    }

    /* Description. */

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, description: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_DESCRIPTION, 'should throw `ERR_INVALID_DESCRIPTION` if an invalid description is given')
    }

    /* Place. */

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_PLACE, 'should throw `ERR_MISSING_PLACE` if no place is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_PLACE, 'should throw `ERR_INVALID_PLACE` if an invalid place is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: 'Amsterdam'})
    } catch (err) {
      st.equal(err.code, db.ERR_UNKNOWN_PLACE, 'should throw `ERR_UNKNOWN_PLACE` if an unknown place is given')
    }

    /* Intake. */

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_INTAKE, 'should throw `ERR_MISSING_INTAKE` if no intake is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an invalid intake is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: '2000'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with only a year is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: '1969-01-01'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with a year lower than 1970 is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: '2000-00-01'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with a month lower than 1 is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: '2000-13-01'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with a month higher than 12 is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: '2000-12-00'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with a day lower than 1 is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: '2000-12-32'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with a day higher than 31 is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: '2000-12'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake without date is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: '2000-12-32'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with an invalid date is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: '197a-01-01'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with an invalid character in the year part is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: '1970a01-01'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with an invalid year-month separator is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: '1970-0a-01'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with an invalid character in the month part is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: '1970-01a01'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with an invalid month-day separator is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: '1970-01-0a'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with an invalid character in the day part is given')
    }

    /* Sex. */

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_SEX, 'should throw `ERR_MISSING_SEX` if no sex is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_SEX, 'should throw `ERR_INVALID_SEX` if an invalid sex is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: 'intersex'})
    } catch (err) {
      st.equal(err.code, db.ERR_UNKNOWN_SEX, 'should throw `ERR_UNKNOWN_SEX` if an unknown sex is given')
    }

    /* Age. */

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_AGE, 'should throw `ERR_MISSING_AGE` if no age is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: '1234'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_AGE, 'should throw `ERR_INVALID_AGE` if an invalid age is given')
    }

    /* Weight. */

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, weight: '1234'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_WEIGHT, 'should throw `ERR_INVALID_WEIGHT` if an invalid weight is given')
    }

    /* Size. */

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, size: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_SIZE, 'should throw `ERR_INVALID_SIZE` if an invalid size is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, size: 'huge'})
    } catch (err) {
      st.equal(err.code, db.ERR_UNKNOWN_SIZE, 'should throw `ERR_UNKNOWN_SIZE` if an unknown size is given')
    }

    /* Length. */

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, length: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_LENGTH, 'should throw `ERR_INVALID_LENGTH` if an invalid length is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, length: 'huge'})
    } catch (err) {
      st.equal(err.code, db.ERR_UNKNOWN_LENGTH, 'should throw `ERR_UNKNOWN_LENGTH` if an unknown length is given')
    }

    /* Coat. */

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, coat: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_COAT, 'should throw `ERR_INVALID_COAT` if an invalid coat is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, coat: 'thickest'})
    } catch (err) {
      st.equal(err.code, db.ERR_UNKNOWN_COAT, 'should throw `ERR_UNKNOWN_COAT` if an unknown coat is given')
    }

    /* Vaccinated. */

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_VACCINATED, 'should throw `ERR_MISSING_VACCINATED` if no vaccinated is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: '1234'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_VACCINATED, 'should throw `ERR_INVALID_VACCINATED` if an invalid vaccinated is given')
    }

    /* Declawed. */

    try {
      db.set({id: entity.id, name: entity.name, type: 'cat', place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated, declawed: '1234'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_DECLAWED, 'should throw `ERR_INVALID_DECLAWED` if an invalid declawed is given for cats')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: 'dog', place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated, declawed: true})
    } catch (err) {
      st.equal(err.code, db.ERR_UNEXPECTED_DECLAWED, 'should throw `ERR_UNEXPECTED_DECLAWED` if an invalid declawed is given for non-cats')
    }

    /* Primary color. */

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_PRIMARY_COLOR, 'should throw `ERR_MISSING_PRIMARY_COLOR` if no primary color is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated, primaryColor: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_PRIMARY_COLOR, 'should throw `ERR_INVALID_PRIMARY_COLOR` if an invalid primary color is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated, primaryColor: ''})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_PRIMARY_COLOR, 'should throw `ERR_INVALID_PRIMARY_COLOR` if an empty primary color is given')
    }

    /* Secondary color. */

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated, primaryColor: entity.primaryColor, secondaryColor: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_SECONDARY_COLOR, 'should throw `ERR_INVALID_SECONDARY_COLOR` if an invalid secondary color is given')
    }

    try {
      db.set({id: entity.id, name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated, primaryColor: entity.primaryColor, secondaryColor: ''})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_SECONDARY_COLOR, 'should throw `ERR_INVALID_SECONDARY_COLOR` if an empty secondary color is given')
    }
  })

  t.test('.add', function (st) {
    var entity = db.all()[0]

    st.plan(51)

    st.equal(typeof db.add, 'function', 'should be a function')

    var copy = {name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated, primaryColor: entity.primaryColor}
    var result = db.add(copy)

    st.equal(typeof result.id, 'string', 'should set an id on the added entity')
    copy.id = result.id
    st.deepEqual(copy, result, 'should return a copy of the added entity if successful')

    /* Entity. */

    try {
      db.add()
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_ENTITY, 'should throw `ERR_MISSING_ENTITY` if no entity is given')
    }

    try {
      db.add('1234')
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_ENTITY, 'should throw `ERR_INVALID_ENTITY` if an invalid entity is given')
    }

    /* Identifier. */

    try {
      db.add({id: '1234'})
    } catch (err) {
      st.equal(err.code, db.ERR_UNEXPECTED_ID, 'should throw `ERR_UNEXPECTED_ID` if an id is given')
    }

    /* Name. */

    try {
      db.add({})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_NAME, 'should throw `ERR_MISSING_NAME` if no name is given')
    }

    try {
      db.add({name: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_NAME, 'should throw `ERR_INVALID_NAME` if an invalid name is given')
    }

    /* Type. */

    try {
      db.add({name: entity.name})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_TYPE, 'should throw `ERR_MISSING_TYPE` if no type is given')
    }

    try {
      db.add({name: entity.name, type: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_TYPE, 'should throw `ERR_INVALID_TYPE` if an invalid type is given')
    }

    try {
      db.add({name: entity.name, type: 'duck'})
    } catch (err) {
      st.equal(err.code, db.ERR_UNKNOWN_TYPE, 'should throw `ERR_UNKNOWN_TYPE` if an unknown type is given')
    }

    /* Description. */

    try {
      db.add({name: entity.name, type: entity.type, description: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_DESCRIPTION, 'should throw `ERR_INVALID_DESCRIPTION` if an invalid description is given')
    }

    /* Place. */

    try {
      db.add({name: entity.name, type: entity.type})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_PLACE, 'should throw `ERR_MISSING_PLACE` if no place is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_PLACE, 'should throw `ERR_INVALID_PLACE` if an invalid place is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: 'Amsterdam'})
    } catch (err) {
      st.equal(err.code, db.ERR_UNKNOWN_PLACE, 'should throw `ERR_UNKNOWN_PLACE` if an unknown place is given')
    }

    /* Intake. */

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_INTAKE, 'should throw `ERR_MISSING_INTAKE` if no intake is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an invalid intake is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: '2000'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with only a year is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: '1969-01-01'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with a year lower than 1970 is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: '2000-00-01'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with a month lower than 1 is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: '2000-13-01'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with a month higher than 12 is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: '2000-12-00'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with a day lower than 1 is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: '2000-12-32'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with a day higher than 31 is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: '2000-12'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake without date is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: '2000-12-32'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with an invalid date is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: '197a-01-01'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with an invalid character in the year part is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: '1970a01-01'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with an invalid year-month separator is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: '1970-0a-01'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with an invalid character in the month part is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: '1970-01a01'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with an invalid month-day separator is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: '1970-01-0a'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_INTAKE, 'should throw `ERR_INVALID_INTAKE` if an intake with an invalid character in the day part is given')
    }

    /* Sex. */

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_SEX, 'should throw `ERR_MISSING_SEX` if no sex is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_SEX, 'should throw `ERR_INVALID_SEX` if an invalid sex is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: 'intersex'})
    } catch (err) {
      st.equal(err.code, db.ERR_UNKNOWN_SEX, 'should throw `ERR_UNKNOWN_SEX` if an unknown sex is given')
    }

    /* Age. */

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_AGE, 'should throw `ERR_MISSING_AGE` if no age is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: '1234'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_AGE, 'should throw `ERR_INVALID_AGE` if an invalid age is given')
    }

    /* Weight. */

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, weight: '1234'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_WEIGHT, 'should throw `ERR_INVALID_WEIGHT` if an invalid weight is given')
    }

    /* Size. */

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, size: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_SIZE, 'should throw `ERR_INVALID_SIZE` if an invalid size is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, size: 'huge'})
    } catch (err) {
      st.equal(err.code, db.ERR_UNKNOWN_SIZE, 'should throw `ERR_UNKNOWN_SIZE` if an unknown size is given')
    }

    /* Length. */

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, length: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_LENGTH, 'should throw `ERR_INVALID_LENGTH` if an invalid length is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, length: 'huge'})
    } catch (err) {
      st.equal(err.code, db.ERR_UNKNOWN_LENGTH, 'should throw `ERR_UNKNOWN_LENGTH` if an unknown length is given')
    }

    /* Coat. */

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, coat: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_COAT, 'should throw `ERR_INVALID_COAT` if an invalid coat is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, coat: 'thickest'})
    } catch (err) {
      st.equal(err.code, db.ERR_UNKNOWN_COAT, 'should throw `ERR_UNKNOWN_COAT` if an unknown coat is given')
    }

    /* Vaccinated. */

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_VACCINATED, 'should throw `ERR_MISSING_VACCINATED` if no vaccinated is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: '1234'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_VACCINATED, 'should throw `ERR_INVALID_VACCINATED` if an invalid vaccinated is given')
    }

    /* Declawed. */

    try {
      db.add({name: entity.name, type: 'cat', place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated, declawed: '1234'})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_DECLAWED, 'should throw `ERR_INVALID_DECLAWED` if an invalid declawed is given for cats')
    }

    try {
      db.add({name: entity.name, type: 'dog', place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated, declawed: true})
    } catch (err) {
      st.equal(err.code, db.ERR_UNEXPECTED_DECLAWED, 'should throw `ERR_UNEXPECTED_DECLAWED` if an invalid declawed is given for non-cats')
    }

    /* Primary color. */

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated})
    } catch (err) {
      st.equal(err.code, db.ERR_MISSING_PRIMARY_COLOR, 'should throw `ERR_MISSING_PRIMARY_COLOR` if no primary color is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated, primaryColor: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_PRIMARY_COLOR, 'should throw `ERR_INVALID_PRIMARY_COLOR` if an invalid primary color is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated, primaryColor: ''})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_PRIMARY_COLOR, 'should throw `ERR_INVALID_PRIMARY_COLOR` if an empty primary color is given')
    }

    /* Secondary color. */

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated, primaryColor: entity.primaryColor, secondaryColor: 1234})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_SECONDARY_COLOR, 'should throw `ERR_INVALID_SECONDARY_COLOR` if an invalid secondary color is given')
    }

    try {
      db.add({name: entity.name, type: entity.type, place: entity.place, intake: entity.intake, sex: entity.sex, age: entity.age, vaccinated: entity.vaccinated, primaryColor: entity.primaryColor, secondaryColor: ''})
    } catch (err) {
      st.equal(err.code, db.ERR_INVALID_SECONDARY_COLOR, 'should throw `ERR_INVALID_SECONDARY_COLOR` if an empty secondary color is given')
    }
  })

  t.end()
})
