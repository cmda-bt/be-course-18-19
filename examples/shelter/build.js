'use strict'

var fs = require('fs')
var path = require('path')
var https = require('https')
var sharp = require('sharp')
var concat = require('concat-stream')
var unified = require('unified')
var html = require('rehype-parse')
var query = require('hast-util-select')
var toString = require('hast-util-to-string')
var camelcase = require('camelcase')
var timeFormat = require('d3-time-format')
var toKilograms = require('mass-converter').LbsToKg
var debug = require('debug')('build')

var proc = unified().use(html)

var root = 'https://www.nycacc.org'
var search = root + '/adopt/adoption-search'
var parse = timeFormat.timeParse('%m-%d-%Y')
var format = timeFormat.timeFormat('%Y-%m-%d')

var keys = {
  isVaccinated: 'vaccinated',
  isDeclawed: 'declawed',
  intakeDate: 'intake',
  coatType: 'coat',
  ageMonths: 'age'
}

var values = {
  intake: date,
  weight: weight,
  sex: sex,
  vaccinated: bool,
  declawed: bool,
  coat: coat,
  age: age,
  primaryColor: color,
  secondaryColor: color,
  length: length,
  size: size
}

var animals = []

debug.enabled = true

process.on('exit', onexit)

https.get(search, onlistconnection)

function onexit() {
  var fp = path.join('db', 'data.json')
  fs.writeFileSync(fp, JSON.stringify(animals, null, 2) + '\n')
}

function onlistconnection(res) {
  res.pipe(concat(onlist))
}

function onanimalconnection(res) {
  res.pipe(concat(onanimal))
}

function onlist(buf) {
  var tree = proc.parse(buf)
  var next = query.select('.pager__item--next a', tree)
  var items = query.selectAll('.main-container .views-field-title a', tree)

  items.forEach(one)

  if (next) {
    debug('next page: %s', search + next.properties.href)
    https.get(search + next.properties.href, onlistconnection)
  }

  function one(node) {
    debug('%s from %s ', toString(node), root + node.properties.href)
    https.get(root + node.properties.href, onanimalconnection)
  }
}

function onanimal(buf) {
  var tree = proc.parse(buf)
  var specs = query.selectAll('.detail-desktop.left-animal-detail .animal-specifications p', tree)
  var detail = query.select('.detail-desktop.right-animal-detail', tree)
  var shortlink = query.select('[rel="shortlink"]', tree)
  var img = query.select('[property="og:image"]', tree)
  var name = query.select('h2', detail)
  var items = query.selectAll('ul li', detail)
  var summary = query.select('#animal-summary', detail)
  var animal = {
    id: shortlink.properties.href.split('/').pop(),
    name: toString(name).trim(),
    type: type(toString(items[1])),
    place: toString(items[2]).trim(),
    description: toString(summary).trim() || null
  }

  if (img && img.properties.content) {
    debug('image for %s', animal.name)
    https.get(img.properties.content, onimageconnection)
  } else {
    debug('no image for %s', animal.name)
  }

  specs.forEach(spec)

  animals.push(animal)

  function onimageconnection(res) {
    res
      .pipe(sharp().resize(1200, 800).max().withoutEnlargement())
      .pipe(fs.createWriteStream(path.join('db', 'image', animal.id + '.jpg')))
  }

  function spec(node) {
    var key = camelcase(toString(node.children[0]).trim().slice(0, -1))
    var value = toString(node.children[1]).trim()
    var prop = key in keys ? keys[key] : key
    var fn = prop in values ? values[prop] : unknown

    animal[prop] = fn(value, key, animal)
  }
}

function type(value, key, animal) {
  var val = value.toLowerCase()

  if (val === 'puppy') {
    val = 'dog'
  } else if (val === 'kitten') {
    val = 'cat'
  }

  if (['cat', 'dog', 'rabbit'].indexOf(val) === -1) {
    console.log('Unknown type value: ', val, key, animal)
  }

  return val
}

function date(value) {
  return format(parse(value))
}

function weight(value) {
  var val = toKilograms(parseInt(value, 10))
  return Math.round(val * 1e3) / 1e3
}

function age(value, key) {
  var val = parseInt(value, 10)
  /* If in months, round to year. */
  return key === 'ageMonths' ? Math.round(val / 12) : val
}

function sex(value) {
  return value.toLowerCase()
}

function bool(value, key, animal) {
  var val = value.toLowerCase()

  if (val === 'yes') {
    val = true
  } else if (val === 'no') {
    val = false
  } else {
    console.log('Unknown bool check: ', val, key, animal)
  }

  return val
}

function color(value) {
  var val = value.toLowerCase()
  return val === 'none' ? null : val
}

function length(value, key, animal) {
  var val = value.toLowerCase().trim()

  if (['short', 'medium', 'long'].indexOf(val) === -1) {
    console.log('Unknown length value: ', val, key, animal)
  }

  return val
}

function size(value, key, animal) {
  var val = value.toLowerCase()

  if (['small', 'medium', 'large'].indexOf(val) === -1) {
    console.log('Unknown size value: ', val, key, animal)
  }

  return val
}

function coat(value, key, animal) {
  var val = value.toLowerCase()

  if (['smooth', 'thick', 'curly'].indexOf(val) === -1) {
    console.log('Unknown coat value: ', val, key, animal)
  }

  return val
}

function unknown(value, key, animal) {
  console.log('Unknown key', value, key, animal)
  return value
}
