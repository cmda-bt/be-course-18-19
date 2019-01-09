'use strict'

/* eslint-env browser */

var moment = require('moment')

var times = document.getElementsByTagName('time')
var length = times.length
var index = -1
var time

while (++index < length) {
  time = times[index]
  time.textContent = moment(time.dateTime, 'YYYY-MM-DD').fromNow()
  time.title = time.dateTime
}
