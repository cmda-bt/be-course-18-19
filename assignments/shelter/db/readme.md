# DB

> A simple database interface for `nycacc.org` data.

*   Data is checked into this repository as `db/data.json`
*   An image for every animal is stored in `db/image/:id.jpg`
*   New data and images can be crawled with `build.js` from
    [nycacc.org](http://nycacc.org)
*   This documentation describes the interface provided by `db/index.js`
    to access the animals in `db/data.json`

## Table of Contents

*   [Usage](#usage)
*   [API](#api)
    *   [db.all()](#dball)
    *   [db.has(id)](#dbhasid)
    *   [db.get(id)](#dbgetid)
    *   [db.remove(id)](#dbremoveid)
    *   [db.removed(id)](#dbremovedid)
    *   [db.set(animal)](#dbsetanimal)
    *   [db.add(animal)](#dbaddanimal)
    *   [Animal](#animal)
    *   [Errors](#errors)
*   [License](#license)

## Usage

## API

### `db.all()`

Get all animals.

###### Returns

`Array.<Animal>` — Array of [`Animal`][animal] objects.

###### Example

```js
db.all()
```

Yields:

```js
[ { id: '18646',
    name: 'Fiona',
    type: 'dog',
    place: 'Brooklyn Animal Care Center',
    description: '',
    sex: 'female',
    age: 2,
    size: 'large',
    vaccinated: true,
    primaryColor: 'brown brindle',
    secondaryColor: null,
    weight: 31.5,
    intakeDate: '2018-01-19' },
  // ...
]
```

### `db.has(id)`

Check if an animal exists.

###### Parameters

*   `id` (`string`) — Identifier of animal

###### Returns

`boolean` — Whether an animal with identifier `id` exists.

###### Throws

[`ERR_MISSING_ID` or `ERR_INVALID_ID`][errors].

###### Example

```js
/* For an existing id: */
db.has('18646') //=> true

/* For an nonexistent id: */
db.has('12345') //=> false
```

### `db.get(id)`

Get an animal.

###### Parameters

*   `id` (`string`) — Identifier of animal

###### Returns

[`Animal?`][animal] — One [`Animal`][animal] with identifier `id` if it exists,
or `undefined` otherwise.

###### Throws

[`ERR_MISSING_ID` or `ERR_INVALID_ID`][errors].

###### Example

For an existing id:

```js
db.get('18646')
```

Yields:

```js
{ id: '18646',
  name: 'Fiona',
  type: 'dog',
  place: 'Brooklyn Animal Care Center',
  description: '',
  sex: 'female',
  age: 2,
  size: 'large',
  vaccinated: true,
  primaryColor: 'brown brindle',
  secondaryColor: null,
  weight: 31.5,
  intakeDate: '2018-01-19' }
```

For a nonexistent id:

```js
db.get('12345')
```

Yields:

```js
undefined
```

### `db.remove(id)`

Remove an animal.

###### Parameters

*   `id` (`string`) — Identifier of animal

###### Returns

`undefined` — Nothing.

###### Throws

[`ERR_MISSING_ID`, `ERR_INVALID_ID`, or `ERR_UNKNOWN_ID`][errors].

###### Example

```js
db.remove('18646') //=> undefined
```

### `db.removed(id)`

Check if an animal is removed.

###### Parameters

*   `id` (`string`) — Identifier of animal

###### Returns

`boolean` — Whether an animal with identifier `id` existed but was since
removed.

###### Throws

[`ERR_MISSING_ID` or `ERR_INVALID_ID`][errors].

###### Example

```js
db.has('18646') //=> true
db.removed('18646') //=> false
db.remove('18646') //=> undefined
db.removed('18646') //=> true
```

### `db.set(animal)`

Replace an animal.

###### Parameters

*   `animal` ([`Animal`][animal]) — Animal with an `id` property

###### Throws

Any of the [validation errors][errors] except `ERR_UNEXPECTED_ID`.

###### Example

```js
db.set({
  id: '18646',
  name: 'Fiona',
  type: 'dog',
  // ...
})
```

### `db.add(animal)`

Add an animal.

###### Parameters

*   `animal` ([`Animal`][animal]) — Animal without an `id` property

###### Returns

[`Animal`][animal] — Copy of the animal that was just placed with an `id`.

###### Throws

Any of the [validation errors][errors] except `ERR_UNEXPECTED_ENTITY`,
`ERR_MISSING_ID`, or `ERR_INVALID_ID`.

###### Example

```js
db.add({
  id: '18646',
  name: 'Fiona',
  type: 'dog',
  // ...
})
```

### `Animal`

Object representing an animal.

###### Properties

*   `id` (`string`)
    — Unique identifier, a stringified finite non-null integer, required except
    when using [`db.add()`][db-add].
*   `name` (`string`)
    — Name of animal
*   `type` (`'dog'`, `'cat'`, or `'rabbit'`)
    — Type of animal
*   `description` (`string`, optional)
    — Description of animal
*   `place` (`'Brooklyn Animal Care Center'`, `'Manhattan Animal Care Center'`,
    or `'Staten Island Animal Care Center'`)
    — Place of shelter for animal
*   `intake` (`string`)
    — Date in the format of `2017-12-23`, so `yyyy-mm-dd`, the animal was taken
    into their place of shelter
*   `sex` (`'female'` or `'male'`)
    — Sex of animal
*   `age` (`number`)
    — Age of animal in years
*   `weight` (`number`, optional)
    — Weight in kilograms of animal
*   `size` (`'small'`, `'medium'`, or `large`, optional)
    — Rough size of animal
*   `length` (`'short'`, `'medium'`, or `long`, optional)
    — Rough length of animal
*   `coat` (`'smooth'` or `'thick'`, optional)
    — Type of animal’s coat
*   `vaccinated` (`boolean`)
    — Whether the animal is vaccinated, true for all animals
*   `declawed` (`boolean`, optional)
    — Whether the animal is declawed, only cats can be declawed
*   `primaryColor` (`string`)
    — Primary color of the animal (such as `'black'` or `'tortoiseshell'`)
*   `secondaryColor` (`string`, optional)
    — Secondary color of the animal, if any (such as `'chocolate'` or `'red'`)

### Errors

The insert operations `set` and `add` throw errors if invalid data is stored.

###### Example

Say we add an animal with a missing `name`:

```js
db.add({id: '1234'})
// [Error: Missing name]
```

Let’s try and display something a bit nicer by catching the error, and checking
its code:

```js
try {
  db.add({id: '1234'})
} catch (err) {
  if (err.code === db.ERR_MISSING_NAME) {
    console.log('Whoops, don’t forget to add a name!')
  } else {
    console.log('Hmm, I don’t know what’s wrong, but maybe this helps? ', err)
  }
}
```

Alternatively, you can check the error’s `property` key too:

```js
try {
  db.add({id: '1234'})
} catch (err) {
  if (err.property === 'name') {
    console.log('There’s something wrong with the name, could you check that again?')
  } else {
    console.log('Hmm, I don’t know what’s wrong, but maybe this helps? ', err)
  }
}
```

###### List of Errors

Below is a list of errors throws by the insert operations.

| Name                          | Reason                  |
| ----------------------------- | ----------------------- |
| `ERR_MISSING_ENTITY`          | Missing entity          |
| `ERR_INVALID_ENTITY`          | Invalid entity          |
| `ERR_UNEXPECTED_ENTITY`       | Forbidden entity        |
| `ERR_MISSING_ID`              | Missing identifier      |
| `ERR_INVALID_ID`              | Invalid identifier      |
| `ERR_UNKNOWN_ID`              | Unknown identifier      |
| `ERR_UNEXPECTED_ID`           | Forbidden identifier    |
| `ERR_MISSING_NAME`            | Missing name            |
| `ERR_INVALID_NAME`            | Invalid name            |
| `ERR_MISSING_TYPE`            | Missing type            |
| `ERR_INVALID_TYPE`            | Invalid type            |
| `ERR_UNKNOWN_TYPE`            | Unknown type            |
| `ERR_INVALID_DESCRIPTION`     | Invalid description     |
| `ERR_MISSING_PLACE`           | Missing place           |
| `ERR_INVALID_PLACE`           | Invalid place           |
| `ERR_UNKNOWN_PLACE`           | Unknown place           |
| `ERR_MISSING_INTAKE`          | Missing intake          |
| `ERR_INVALID_INTAKE`          | Invalid intake          |
| `ERR_MISSING_SEX`             | Missing sex             |
| `ERR_INVALID_SEX`             | Invalid sex             |
| `ERR_UNKNOWN_SEX`             | Unknown sex             |
| `ERR_MISSING_AGE`             | Missing age             |
| `ERR_INVALID_AGE`             | Invalid age             |
| `ERR_INVALID_WEIGHT`          | Invalid weight          |
| `ERR_INVALID_SIZE`            | Invalid size            |
| `ERR_UNKNOWN_SIZE`            | Unknown size            |
| `ERR_INVALID_LENGTH`          | Invalid length          |
| `ERR_UNKNOWN_LENGTH`          | Unknown length          |
| `ERR_INVALID_COAT`            | Invalid coat            |
| `ERR_UNKNOWN_COAT`            | Unknown coat            |
| `ERR_MISSING_VACCINATED`      | Missing vaccinated      |
| `ERR_INVALID_VACCINATED`      | Invalid vaccinated      |
| `ERR_INVALID_DECLAWED`        | Invalid declawed        |
| `ERR_UNEXPECTED_DECLAWED`     | Forbidden declawed      |
| `ERR_MISSING_PRIMARY_COLOR`   | Missing primary color   |
| `ERR_INVALID_PRIMARY_COLOR`   | Invalid primary color   |
| `ERR_INVALID_SECONDARY_COLOR` | Invalid secondary color |

###### List of Types

All errors have a `type` key that describes what they relate to.

*   `'entity'`
*   `'id'`
*   `'name'`
*   `'type'`
*   `'place'`
*   `'intake'`
*   `'sex'`
*   `'age'`
*   `'weight'`
*   `'size'`
*   `'length'`
*   `'code'`
*   `'vaccinated'`
*   `'declawed'`
*   `'primaryColor'`
*   `'secondaryColor'`

###### List of Categories

All errors have a `category` key that describes what type of error they relate
to.

*   `'missing'` — Something was expected but not found
*   `'invalid'` — Something was of a wrong data type or empty
*   `'unknown'` — Something was not found in a list of known values
*   `'unexpected'` — Something was found but not expected

## License

[MIT][] © [Titus Wormer][author]

[mit]: ../license

[author]: http://wooorm.com

[db-add]: #dbaddanimal

[animal]: #animal

[errors]: #errors
