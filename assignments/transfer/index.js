'use strict';

var Emitter = require('events').EventEmitter;
var chalk = require('chalk');
var escapes = require('ansi-escapes');
var wrap = require('wrap-ansi');
var start = require('./server');

var token = parseInt('backend', 36).toString(16);
var port = 1901;

var server = start(port);
var evs = new Emitter();

step1();

server.on('request', onrequest);

function onrequest(req, res) {
  res.once('finish', onfinish);

  function onfinish() {
    evs.emit('request', req, res);
  }
}

function step1() {
  print([
    chalk.bold.green('TUTORIAL'),
    '',
    'Hi! 👋 Welcome to the transfer tutorial!',
    '',
    'I just started a server for you.  It is an API for movies.  The API part ' +
    'essentially means that this server returns data: more specifically in ' +
    'this case, JSON data.  The movie API runs on ' +
    chalk.bold('localhost:' + port) + '.  You can access the API by sending ' +
    'requests to it with a user agent.',
    '',
    chalk.bold.yellow('STEP 1 / 19'),
    '',
    'To proceed, ' +
    chalk.bold.cyan('open localhost:' + port + ' in your browser') +
    '.  Check back here when done to see the next step.',
    '',
    chalk.bold.yellow('Note') + ': If you ever send something that the ' +
    'tutorial did not expect, you’ll see logs of what it got here at the ' +
    'bottom.'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/' &&
      req.method === 'GET' &&
      res.statusCode === 200
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step2();
    }
  }
}

function step2() {
  print([
    chalk.bold.yellow('STEP 1') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Sweet') + '!  Well done!  Your browser displayed some ' +
    'JSON, right? It did that because the web browser sent a ' +
    chalk.bold.blue('GET') + ' request (“give me the thing”) to ' +
    chalk.bold.blue('/') + ' on ' + chalk.bold.blue('localhost:' + port) + '.  ' +
    'The API responded by sending movies back.  Your web browser acted for ' +
    'you: as a user agent.  The API responded with JSON, and your browser ' +
    'displayed it.  The result is a list of movies, where each movie has ' +
    'the following properties:',
    '',
    '*   ' + chalk.bold('id') + ' - unique identifier',
    '*   ' + chalk.bold('title') + ' - title',
    '*   ' + chalk.bold('plot') + ' - short description',
    '*   ' + chalk.bold('description') + ' - long description',
    '',
    chalk.bold.yellow('STEP 2 / 19'),
    '',
    'As a user, your web browser can act for you, but so can Curl.  It is a ' +
    'command line application that can send HTTP requests.  Just like your ' +
    'browser, but with more options.  In this step, send a ' +
    chalk.bold('GET') + ' request to ' + chalk.bold('/') + ' on ' +
    chalk.bold('localhost:' + port) + ' with Curl by running the ' +
    'following code in another tab of your terminal:',
    '',
    '  ' + chalk.bold.cyan('curl localhost:1901'),
    '',
    'Inspect the result, and check back here for the next step.'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/' &&
      req.method === 'GET' &&
      res.statusCode === 200
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step3();
    }
  }
}

function step3() {
  print([
    chalk.bold.yellow('STEP 2') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Nice') + '!  If everything went okay, you saw the ' +
    'same result as in your browser, right?  A list of movies?  Good.  ' +
    'Next to the list of movies, The API also sends info about them, but ' +
    'Curl or your browser don\'t display that normally.  Just like the ' +
    chalk.bold('<body>') + ' element (the document) and the ' +
    chalk.bold('<head>') + ' element (info about the document) in HTML, HTTP ' +
    'also has a head and a body.',
    '',
    chalk.bold.yellow('STEP 3 / 19'),
    '',
    'Now, inspect the headers sent to and from the API using Curl\'s ' +
    chalk.bold('verbose') + ' mode, by running the following code in the ' +
    'other tab of your terminal:',
    '',
    '  ' + chalk.bold.cyan('curl localhost:1901 --verbose'),
    '',
    'Inspect the result and check back here for the next step.'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/' &&
      req.method === 'GET' &&
      res.statusCode === 200
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step4();
    }
  }
}

function step4() {
  print([
    chalk.bold.yellow('STEP 3') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Well done') + '!  The output you saw reads like this:',
    '',
    '*   Setup before HTTP, such as DNS and TCP/IP (lines starting with ' +
    chalk.bold('*') + ')',
    '*   Request sent to server (lines in its head start with ' +
    chalk.bold('>') + ')',
    '*   Response sent from server (lines in its head start with ' +
    chalk.bold('<') + ')',
    '',
    'The request head starts with a “request line”, in this case:',
    '',
    '  ' + chalk.bold.blue('GET / HTTP/1.1'),
    '',
    'Where the first word is the HTTP method (' + chalk.bold('GET') + '), ' +
    'then comes the path requested from the server (' + chalk.bold('/') + '), ' +
    'and finally the protocol (' + chalk.bold('HTTP') + ') and version (' +
    chalk.bold('1.1') + ').',
    '',
    chalk.bold.yellow('STEP 4 / 19'),
    '',
    'Next to GET, there are other HTTP methods.  To find out which ones are ' +
    'supported for a resource, send an ' + chalk.bold('OPTIONS') + ' ' +
    'request to ' + chalk.bold('/') + ' like so:',
    '',
    '  ' + chalk.bold.cyan('curl localhost:1901 --verbose --request OPTIONS'),
    '',
    'Inspect the result and check back here for the next step.'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/' &&
      req.method === 'OPTIONS' &&
      res.statusCode === 200
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step5();
    }
  }
}

function step5() {
  print([
    chalk.bold.yellow('STEP 4') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Bravo') + '!  After the request line we covered come ' +
    'request headers, such as ' + chalk.bold('User-Agent') + ' (tells the ' +
    'server some info on who is contacting it) and ' +
    chalk.bold('Accept') + ' (tells the server what kind of data the client ' +
    'would like, ' + chalk.bold('*/*') + ' means anything).',
    '',
    'Then comes the response, which starts with a “status line” like this:',
    '',
    '  ' + chalk.bold.blue('HTTP/1.1 200 OK'),
    '',
    'Where the first part is the protocol and version again, then comes the ' +
    'status code (' + chalk.bold('200') + '), and finally the reason phrase ' +
    '(a short description of the status code, in this case ' +
    chalk.bold('OK') + ').  After the status line come response headers, ' +
    'such as ' + chalk.bold('Date') + ' (current time on the server) and in ' +
    'the case of OPTIONS, ' + chalk.bold('Allow') + ' (list of allowed ' +
    'methods for the resource).  The response head can be followed by data, ' +
    'but in the case of OPTIONS no data is sent back from the server.',
    '',
    chalk.bold.yellow('STEP 5 / 19'),
    '',
    'Next to the methods we already covered, GET and OPTIONS, the Allow ' +
    'header also mentions other methods, HEAD and POST, but we will cover ' +
    'those later.  Let\'s first try a method that is not listed.  Send a ' +
    chalk.bold.cyan('DELETE') + ' request to ' + chalk.bold.cyan('/') + ' like ' +
    'you did previously with ' + chalk.bold('--request OPTIONS') + '.  ' +
    'Inspect the result and check back here for the next step.'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/' &&
      req.method === 'DELETE' &&
      res.statusCode === 405
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step6();
    }
  }
}

function step6() {
  print([
    chalk.bold.yellow('STEP 5') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Beautiful') + '!  ' + chalk.bold.blue('DELETE') + ' ' +
    'is used to remove things, but the API does not support removing the ' +
    'whole list of movies.  It does support other methods, and we will ' +
    'cover them next.  First, note the status line:',
    '',
    '  ' + chalk.bold.blue('HTTP/1.1 405 Method Not Allowed'),
    '',
    'Status codes in the range of 4xx mean that the client made an error.  ' +
    'In this case, ' + chalk.bold('405 Method Not Allowed') + ', means ' +
    'that the method (' + chalk.bold('DELETE') + ') is not supported.',
    '',
    chalk.bold.yellow('STEP 6 / 19'),
    '',
    'The Allow header also mentioned ' + chalk.bold('HEAD') + ' (and POST).  ' +
    'HEAD is like GET but tells the server not to send any data back. To ' +
    'proceed, send a ' + chalk.bold.cyan('HEAD') + ' request to ' +
    chalk.bold.cyan('/') + '.  Inspect the result and check back here for ' +
    'the next step.',
    '',
    chalk.bold.yellow('Note') + ': Curl will warn, but you can ignore that ' +
    'if you are using verbose mode.'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/' &&
      req.method === 'HEAD' &&
      res.statusCode === 200
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step7();
    }
  }
}

function step7() {
  print([
    chalk.bold.yellow('STEP 6') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Terrific') + '!  That was not very interesting though: ' +
    'HEAD is the same as GET but without the body.  ' +
    chalk.bold.blue('POST') + ' however, is much more interesting!  POST is ' +
    'used to add something to a resource.  So if ' + chalk.bold('/') + ' is ' +
    'a list of movies, ' + chalk.bold('POST') + 'ing to it should add a ' +
    'movie to the list!',
    '',
    chalk.bold.yellow('STEP 7 / 19'),
    '',
    'Let\'s try it.  To proceed, send a ' + chalk.bold.cyan('POST') + ' ' +
    'request to ' + chalk.bold.cyan('/') + ' like you did with ' +
    chalk.bold('--request HEAD') + '.  Inspect the result and check back ' +
    'here for the next step.',
    '',
    chalk.bold.yellow('Note') + ': You are about to see an error but that is ' +
    'expected!'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/' &&
      req.method === 'POST' &&
      res.statusCode === 400
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step8();
    }
  }
}

function step8() {
  print([
    chalk.bold.yellow('STEP 7') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Splendid') + '!  Yes, there was an error, but that ' +
    'was expected.  We will fix it in a minute.  But first, note the status ' +
    'line:',
    '',
    '  ' + chalk.bold.blue('HTTP/1.1 400 Bad Request'),
    '',
    'The status code is again in the 4xx range, meaning a client error.  ' +
    'In this case, we were adding a movie right?  So the server expected a ' +
    'movie.  Specifically, a movie in JSON format, as noted in the ' +
    chalk.bold.blue('errors') + ' array in the response data (“Unexpected ' +
    'end of JSON input”).',
    '',
    chalk.bold.yellow('STEP 8 / 19'),
    '',
    'Let\'s try uploading some data, by sending a ' + chalk.bold('POST') + ' ' +
    'request to ' + chalk.bold('/') + ' with an empty JSON object (' +
    chalk.bold(JSON.stringify({})) + ').  Run the following code:',
    '',
    '  ' + chalk.bold.cyan('curl localhost:1901 --verbose --request POST --data \'' + JSON.stringify({}) + '\''),
    '',
    'Inspect the result and check back here for the next step.',
    '',
    chalk.bold.yellow('Note') + ': You are about to see another error but ' +
    'that is OK!'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/' &&
      req.method === 'POST' &&
      res.statusCode === 422 &&
      String(res.in) === JSON.stringify({})
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step9();
    }
  }
}

function step9() {
  print([
    chalk.bold.yellow('STEP 8') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Right on') + '!  Sure, there was another error, but ' +
    'this time it\'s more useful.  Note the status line:',
    '',
    '  ' + chalk.bold.blue('HTTP/1.1 422 Unprocessable Entity'),
    '',
    'The status code is again in the 4xx range, meaning a client error.  ' +
    'Specifically, ' + chalk.bold('422 Unprocessable Entity') + ' means ' +
    'that the request was valid, but there was something wrong with the data ' +
    'being sent to the server.  See the ' + chalk.bold('errors') + ' list in ' +
    'the response body? “Missing title property in data”.  Apparently, we ' +
    'need to send a title in the data.  Makes sense, all movies have a title ' +
    'right?',
    '',
    chalk.bold.yellow('STEP 9 / 19'),
    '',
    'Let\'s try again, this time sending an object with a ' + chalk.bold('title') + ' property.  ' +
    chalk.bold.cyan('POST') + ' to ' + chalk.bold.cyan('/') + ' and send ' +
    chalk.bold.cyan(JSON.stringify({title: 'Wonder Woman'})) + '.',
    '',
    'Inspect the result and check back here for the next step.'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/' &&
      req.method === 'POST' &&
      res.statusCode === 201 &&
      res.out.data &&
      res.out.data.id === 'wonder-woman'
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step10();
    }
  }
}

function step10() {
  print([
    chalk.bold.yellow('STEP 9') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Wonderful') + '!  You added a movie!  In the result, ' +
    'there are a few interesting bits.  For one, the status line now ' +
    'contains ' + chalk.bold('201 Created') + ', a success code for new ' +
    'resources.  Also, the response head contains ' +
    chalk.bold('Location: /wonder-woman') + ', the place the new resource ' +
    'is located at.  And, the response body has a movie with an ' +
    chalk.bold('id') + ' and ' + chalk.bold('title') + ', but ' +
    chalk.bold('plot') + ' and ' + chalk.bold('description') + ' are ' +
    'missing (null).  We will add those later.',
    '',
    chalk.bold.yellow('STEP 10 / 19'),
    '',
    'Let\'s find out what we can do with a movie! Remember OPTIONS? Send an ' +
    chalk.bold.cyan('OPTIONS') + ' request to the newly created resource, ' +
    chalk.bold.cyan('localhost:' + port + '/wonder-woman') + '.  Inspect ' +
    'the result and check back here for the next step.'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/wonder-woman' &&
      req.method === 'OPTIONS' &&
      res.statusCode === 200
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step11();
    }
  }
}

function step11() {
  print([
    chalk.bold.yellow('STEP 10') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Perfect') + '!  In the ' + chalk.bold('Allow') + ' ' +
    'header, there are three methods we did not cover before: ' +
    chalk.bold('PATCH') + ', ' + chalk.bold('PUT') + ', and ' +
    chalk.bold('DELETE') + '.  ' + chalk.bold('HEAD') + ' is also included ' +
    'again.',
    '',
    chalk.bold.yellow('STEP 11 / 19'),
    '',
    'Remember how HEAD was not very useful?  One of the things it is useful ' +
    'for is checking if something exists, even if it is not actually ' +
    'needed.  For example, sending a ' + chalk.bold('HEAD') + ' request to ' +
    chalk.bold('/') + ' resulted in ' + chalk.bold('200 OK') + ', and so ' +
    'would a ' + chalk.bold('HEAD') + ' to ' +
    chalk.bold('/wonder-woman') + ', but what happens if a not existing ' +
    'movie is requested?  To proceed, send a ' + chalk.bold.cyan('HEAD') +
    ' request to ' + chalk.bold.cyan('/nonexistent-movie') + '.',
    '',
    chalk.bold.yellow('Note') + ': Curl will warn again, but you can ignore ' +
    'that if you are using verbose mode.'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (req.method === 'HEAD' && res.statusCode === 404) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step12();
    }
  }
}

function step12() {
  print([
    chalk.bold.yellow('STEP 11') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Super') + ', that\'s more useful!  Now, how about ' +
    'the other methods we saw in ' + chalk.bold('Allow') + '?',
    '',
    chalk.bold.yellow('STEP 12 / 19'),
    '',
    'Let\'s try PUT first.  PUT is used to place a resource somewhere, ' +
    'whether it exists already or not.  Remember that POST is used to add something to ' +
    'a resource?  Posting to ' + chalk.bold('/') + ' adds a movie?  PUT ' +
    'places that something at exactly that place.',
    '',
    'To summarise:',
    '',
    '*   POST to ' + chalk.bold('/') + ' to add a movie to a list of movies',
    '*   PUT to ' + chalk.bold('/wonder-woman') + ' to place a movie there, ' +
    'if it exists or not',
    '',
    'To proceed, send a ' + chalk.bold.cyan('PUT') + ' request to ' +
    chalk.bold.cyan('/wonder-woman') + ' and send ' +
    chalk.bold.cyan(JSON.stringify({
      title: 'Wonder Woman',
      plot: 'Diana fights a war'
    })) + '.  Inspect the result and check back here for the next step.'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/wonder-woman' &&
      req.method === 'PUT' &&
      res.statusCode === 200 &&
      res.out.data &&
      /diana/i.test(res.out.data.plot)
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step13();
    }
  }
}

function step13() {
  print([
    chalk.bold.yellow('STEP 12') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Fantastic') + '!  The ' + chalk.bold('plot') + ' of ' +
    'the movie is now filled.  PUT is nice for saving a whole resource, but ' +
    'you need to send other properties (like ' + chalk.bold('title') + ') ' +
    'along as well, even if they did not change.',
    '',
    chalk.bold.yellow('STEP 13 / 19'),
    '',
    'To change only a few things, use ' + chalk.bold('PATCH') + '.  To ' +
    'proceed, send a ' + chalk.bold.cyan('PATCH') + ' request to ' +
    chalk.bold.cyan('/wonder-woman') + ' and send ' +
    chalk.bold.cyan(JSON.stringify({
      description: 'Diana leaves home to fight a war.'
    })) + '.  Inspect the result and check back here for the next step.'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/wonder-woman' &&
      req.method === 'PATCH' &&
      res.statusCode === 200 &&
      res.out.data &&
      /diana/i.test(res.out.data.description)
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step14();
    }
  }
}

function step14() {
  print([
    chalk.bold.yellow('STEP 13') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Very good') + '!  Wonder Woman is now documented ' +
    'properly.  There is an ' + chalk.bold('id') + ', ' +
    chalk.bold('title') + ', ' + chalk.bold('plot') + ', and a ' +
    chalk.bold('description') + '.',
    '',
    chalk.bold.yellow('STEP 14 / 19'),
    '',
    'The only method left for us to try is ' + chalk.bold('DELETE') + '.  ' +
    'We used it before on ' + chalk.bold('/') + ', but that did not work.  ' +
    'To proceed, send a ' + chalk.bold.cyan('DELETE') + ' request to ' +
    chalk.bold.cyan('/wonder-woman') + '.  Inspect the result and check back ' +
    'here for the next step.'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/wonder-woman' &&
      req.method === 'DELETE' &&
      res.statusCode === 204
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step15();
    }
  }
}

function step15() {
  print([
    chalk.bold.yellow('STEP 14') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Outstanding') + '!  The movie is no more.  Note the ' +
    'status line:',
    '',
    '  ' + chalk.bold.blue('HTTP/1.1 204 No Content'),
    '',
    'The status code is in the 2xx range, which means the request was ' +
    'successful.  ' + chalk.bold('204 No Content') + ' specifically means ' +
    'that everything was OK, but there is no need for the server to send any ' +
    'data back.',
    '',
    chalk.bold.yellow('STEP 15 / 19'),
    '',
    'Let\'s try and see if the movie is actually removed.  To proceed, send ' +
    'a ' + chalk.bold.cyan('GET') + ' request to ' +
    chalk.bold.cyan('/wonder-woman') + '.  Inspect the result and check back ' +
    'here for the next step.'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/wonder-woman' &&
      req.method === 'GET' &&
      res.statusCode === 410
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step16();
    }
  }
}

function step16() {
  server.xmlEnabled = true;

  print([
    chalk.bold.yellow('STEP 15') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Hooray') + '!  There’s no movie anymore.  Note the ' +
    'status line:',
    '',
    '  ' + chalk.bold.blue('HTTP/1.1 410 Gone'),
    '',
    'The status code is again in the 4xx range, which means the client made ' +
    'an error.  ' + chalk.bold('410 Gone') + ' specifically means that there ' +
    'used to be something there, but it no longer exists.  Apparently, the ' +
    'movie API keeps track of movies that used to be there.',
    '',
    chalk.bold.yellow('STEP 16 / 19'),
    '',
    'As you\'ve been told, and as you probably saw, the API returns JSON ' +
    'data.  That is not always the case though.  The API can also return ' +
    'XML data.  In fact, APIs could return HTML as well, or CSV, or other ' +
    'data formats, based on what the client wants.',
    '',
    'Let\'s try asking for XML, by sending a ' + chalk.bold('GET') + ' ' +
    'request to ' + chalk.bold('/') + ' with an ' + chalk.bold('Accept') + ' ' +
    'header with the value ' + chalk.bold('application/xml') + '.  You can ' +
    'add a request header in Curl like so:',
    '',
    '  ' + chalk.bold.cyan('--header \'Accept: application/xml\''),
    '',
    'Inspect the result and check back here for the next step.'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/' &&
      req.method === 'GET' &&
      res.statusCode === 200 &&
      res.getHeader('Content-Type') === 'application/xml'
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step17();
    }
  }
}

function step17() {
  print([
    chalk.bold.yellow('STEP 16') + ' ' + chalk.bold.green('✔'),
    '',
    'Did you see the ' + chalk.bold('Content-Type') + ' header?',
    '',
    '  ' + chalk.bold.blue('Content-Type: application/xml'),
    '',
    'The API understood your request, ' + chalk.bold('Accept') + ', and sent ' +
    'back different data.  XML is kind-of hard to deal with though, JSON is ' +
    'a much more readable format, especially if you are familiar with ' +
    'JavaScript!',
    '',
    chalk.bold.yellow('STEP 17 / 19'),
    '',
    'About readability: although JSON is readable, it’s a bit big, as a lot ' +
    'of things (like properties of objects) are repeated a lot.  Clients can ' +
    'send a hint to a server, that they support some kind of "encoding".  If ' +
    'the server supports that encoding, often a compression algorithm, it ' +
    'will usually use it and send back compressed data.  One popular ' +
    'compression algorithm is ' + chalk.bold('gzip') + '.',
    '',
    'Let\'s try asking for a GZipped resource, by sending a ' +
    chalk.bold('GET') + ' request to ' + chalk.bold('/') + ' with an ' +
    chalk.bold.cyan('Accept-Encoding') + ' header with the value ' +
    chalk.bold.cyan('gzip') + '.  Just like you did before with ' +
    chalk.bold('Accept') + ', but this time using a different header.',
    '',
    'Inspect the result and check back here for the next step.',
    '',
    chalk.bold.yellow('Note') + ': The result is supposed to be unreadable!'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/' &&
      req.method === 'GET' &&
      res.statusCode === 200 &&
      res.getHeader('Content-Encoding') === 'gzip'
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step18();
    }
  }
}

function step18() {
  server.tokens.push(token);

  print([
    chalk.bold.yellow('STEP 17') + ' ' + chalk.bold.green('✔'),
    '',
    'Did you see the ' + chalk.bold('Content-Encoding') + ' header?',
    '',
    '  ' + chalk.bold.blue('Content-Encoding: gzip'),
    '',
    'Again, the API understood your ' + chalk.bold('Accept-Encoding') + ' ' +
    'request and sent back different data.  As you may have noticed, GZipped ' +
    'data is not readable at all for humans, but browsers and other user ' +
    'agents often deal with it automatically.',
    '',
    chalk.bold.yellow('STEP 18 / 19'),
    '',
    'During this tutorial, you were allowed to remove, add, and update ' +
    'movies.  Well, that is horribly insecure.  If this server would run ' +
    'on the web, anyone could do that as well.  In the real world, nobody ' +
    'would be allowed to do such things, except if they were authorized to ' +
    'do so.',
    '',
    'Well, I just secured this server, to do just that.  Let\'s try it out ' +
    'by removing a movie.  Send a ' + chalk.bold('DELETE') + ' request to ' +
    chalk.bold('/evil-dead') + '.',
    '',
    'Inspect the result and check back here for the next step.',
    '',
    chalk.bold.yellow('Note') + ': yes, the authentication works now, so ' +
    'you are not allowed to do that: you are expected to fail!'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/evil-dead' &&
      req.method === 'DELETE' &&
      res.statusCode === 401
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      step19();
    }
  }
}

function step19() {
  print([
    chalk.bold.yellow('STEP 18') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Yes') + '!  Sure, it failed, but that was supposed to ' +
    'happen.  At least our API is secure, right?  Did you see the status line?',
    '',
    '  ' + chalk.bold.blue('HTTP/1.1 401 Unauthorized'),
    '',
    'The status code was again in the 4xx range (a client error), ' +
    'specifically, ' + chalk.bold('401 Unauthorized') + ' means that the ' +
    'thing you wanted to do may be possible, but only if you are authorized ' +
    'to do so.',
    '',
    chalk.bold.yellow('STEP 19 / 19'),
    '',
    'But how to authorize a request?  Well, that depends based on the server ' +
    'you are talking to.  Most APIs have very good docs describing how to do ' +
    'that.  In our case, it\'s by sending a token to the API.  Try it out by ' +
    'sending a ' + chalk.bold('DELETE') + ' request to ' +
    chalk.bold('/evil-dead') + ' again, but this time use an ' +
    chalk.bold.cyan('Authorization') + ' header with the value ' +
    chalk.bold.cyan('token ' + token) + '.  Inspect the result and ' +
    'check back here for the next step.'
  ].join('\n'));

  evs.on('request', onrequest);

  function onrequest(req, res) {
    if (
      req.url === '/evil-dead' &&
      req.method === 'DELETE' &&
      res.statusCode === 204
    ) {
      evs.removeListener('request', onrequest);
      process.stdout.write(escapes.beep);
      complete();
    }
  }
}

function complete() {
  print([
    chalk.bold.yellow('STEP 17') + ' ' + chalk.bold.green('✔'),
    '',
    chalk.bold.green('Awesome') + '!  The evil dead are gone!  The status ' +
    'code was in the 2xx range, meaning successful!',
    '',
    chalk.bold.green('COMPLETE'),
    '',
    'You\'re a genius!  Super duper.  You finished every step!  You now know:',
    '',
    '* HTTP methods: OPTIONS, HEAD, GET, POST, PUT, PATCH, and DELETE',
    '* HTTP status codes: 200 OK, 201 Created, 204 No Content, 400 Bad ' +
    'Request, 401 Unauthorized, 404 Not Found, 405 Method Not Allowed, ' +
    '410 Gone, and 422 Unprocessable Entity',
    '* HTTP headers: Accept and Content-Type, Accept-Encoding and ' +
    'Content-Encoding, and Authorization',
    '* How to use Curl to make requests, set headers, and send data to a ' +
    'server',
    '',
    'Now, keep in mind, even though HTTP is a standard protocol, not all ' +
    'servers use the same methods or status codes.  For example, OPTIONS and ' +
    'PATCH are often not used, and 400 Bad Request is often used instead of ' +
    'other 4xx errors.',
    '',
    'Other than that, you\'ve done very well!  Congratulations!'
  ].join('\n'));

  server.close();
}

function print(value) {
  var doc = wrap(value, 75, {trim: false}).replace(/\n/g, '\r\n');
  process.stdout.write(escapes.clearScreen + doc + '\r\n');
}
