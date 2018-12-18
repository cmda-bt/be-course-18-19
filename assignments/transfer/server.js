'use strict';

var http = require('http');
var zlib = require('zlib');
var debug = require('debug');
var Route = require('route-parser');
var concat = require('concat-stream');
var accepts = require('accepts');
var slug = require('slug');
var jsontoxml = require('jsontoxml');
var db = require('./db');

var request = debug('api:req');
var response = debug('api:res');

/* URLs to ignore when logging. */
var ignore = [
  '/apple-touch-icon-precomposed.png',
  '/favicon.ico',
  '/apple-touch-icon.png'
];

request.enabled = true;
response.enabled = true;

module.exports = start;

/* Handlers that require authentication.
 * Note: at least one `token` must be set in `server.tokens`. */
add.requireAuthentication = true;
insert.requireAuthentication = true;
change.requireAuthentication = true;
remove.requireAuthentication = true;

/* API definition. */
var specs = [
  {
    route: new Route('/'),
    OPTIONS: options,
    HEAD: movies,
    GET: movies,
    POST: add
  },
  {
    route: new Route('/:id'),
    OPTIONS: options,
    HEAD: movie,
    GET: movie,
    PATCH: change,
    PUT: insert,
    DELETE: remove
  }
];

/* Start the API. */
function start(port) {
  var server = http.createServer(onrequest).listen(port);
  server.tokens = [];
  return server;
}

/* Respond to any request. */
function onrequest(req, res) {
  var method = req.method;
  var length = specs.length;
  var index = -1;
  var spec;
  var match;
  var fn;

  if (ignore.indexOf(req.url) === -1) {
    request('%s %s', req.method, req.url);
  }

  while (++index < length) {
    spec = specs[index];
    match = spec.route.match(req.url);

    if (match) {
      fn = method in spec ? spec[method] : notAllowed;

      if (fn.requireAuthentication && !authorized.call(this, req, req)) {
        fn = unauthorized;
      }

      return fn.call(this, req, res, match, spec);
    }
  }

  notFound.call(this, req, res);
}

/* GET or HEAD entities. */
function movies(req, res) {
  res.out = {errors: [], data: db.all()};
  res.statusCode = 200;

  respond.call(this, req, res, res.out);

  response('%d %s', res.statusCode, res.statusMessage);
  response('- out: %o', res.out);
}

/* GET or HEAD an entity. */
function movie(req, res, match) {
  var data;

  try {
    data = db.get(match.id);
  } catch (err) {
    return internalServerError.call(this, req, res, err);
  }

  if (data) {
    res.out = {errors: [], data: data};
    res.statusCode = 200;

    respond.call(this, req, res, res.out);

    response('%d %s', res.statusCode, res.statusMessage);
    response('- out: %o', res.out);
  } else {
    notFound.call(this, req, res, match);
  }
}

/* POST an entity. */
function add(req, res) {
  var self = this;

  req.pipe(concat(ok));

  function ok(buf) {
    var data;
    var movie;

    res.in = buf;
    request('- in: "%s"', buf);

    try {
      data = JSON.parse(buf);
    } catch (err) {
      return badRequest.call(self, req, res, err);
    }

    if (data.id) {
      return unprocessableEntity.call(self, req, res, new Error('Forbidden `id` property in data'));
    }

    if (!data.title) {
      return unprocessableEntity.call(self, req, res, new Error('Missing `title` property in data'));
    }

    movie = {
      id: slug(data.title).toLowerCase(),
      title: String(data.title),
      plot: data.plot ? String(data.plot) : null,
      description: data.description ? String(data.description) : null
    };

    try {
      db.add(movie);
    } catch (err) {
      if (err.code === db.ERR_ALREADY_EXISTS) {
        return badRequest.call(self, req, res, new Error('Cannot add duplicate entity'));
      }

      return internalServerError.call(self, req, res, err);
    }

    res.out = {errors: [], data: movie};
    res.statusCode = 201;
    res.setHeader('Location', '/' + movie.id);

    respond.call(self, req, res, res.out);

    response('%d %s', res.statusCode, res.statusMessage);
    response('- out: %o', res.out);
  }
}

/* PATCH an entity. */
function change(req, res, match) {
  var self = this;

  if (db.has(match.id)) {
    req.pipe(concat(ok));
  } else {
    notFound.call(self, req, res, match);
  }

  function ok(buf) {
    var data;
    var movie;
    var key;

    res.in = buf;
    request('- in: "%s"', buf);

    try {
      data = JSON.parse(buf);
    } catch (err) {
      return badRequest.call(self, req, res, err);
    }

    movie = db.get(match.id);

    for (key in data) {
      if (key in movie) {
        movie[key] = data[key];
      }
    }

    try {
      db.set(movie);
    } catch (err) {
      return internalServerError.call(self, req, res, err);
    }

    res.out = {errors: [], data: movie};
    res.statusCode = 200;

    respond.call(self, req, res, res.out);

    response('%d %s', res.statusCode, res.statusMessage);
    response('- out: %o', res.out);
  }
}

/* PUT an entity. */
function insert(req, res, match) {
  var self = this;
  var exists = db.has(match.id);

  req.pipe(concat(ok));

  function ok(buf) {
    var data;
    var movie;

    res.in = buf;
    request('- in: "%s"', buf);

    try {
      data = JSON.parse(buf);
    } catch (err) {
      return badRequest.call(self, req, res, err);
    }

    if (!data.title) {
      return unprocessableEntity.call(self, req, res, new Error('Missing `title` property in data'));
    }

    movie = {
      id: match.id,
      title: String(data.title),
      plot: data.plot ? String(data.plot) : null,
      description: data.description ? String(data.description) : null
    };

    try {
      db.set(movie);
    } catch (err) {
      return internalServerError.call(self, req, res, err);
    }

    res.out = {errors: [], data: movie};
    res.statusCode = exists ? 200 : 201;

    respond.call(self, req, res, res.out);

    response('%d %s', res.statusCode, res.statusMessage);
    response('- out: %o', res.out);
  }
}

/* DELETE an entity. */
function remove(req, res, match) {
  var id = match.id;

  if (db.has(id)) {
    try {
      db.remove(id);
    } catch (err) {
      return internalServerError.call(this, req, res, err);
    }

    res.statusCode = 204;

    respond.call(this, req, res, res.out);

    response('%d %s', res.statusCode, res.statusMessage);
    response('- out: %o', res.out);
  } else {
    notFound.call(this, req, res, match);
  }
}

/* Respond for a missing entity. */
function notFound(req, res, match) {
  var id = match && match.id && db.removed(match.id) ? 410 : 404;
  var message = id === 410 ? 'Gone' : 'Not found';
  var err = {id: id, title: message, detail: req.url + ' cannot be found.'};

  res.out = {errors: [err], data: null};
  res.statusCode = id;

  respond.call(this, req, res, res.out);

  response('%d %s', res.statusCode, res.statusMessage);
  response('- out: %o', res.out);
}

/* Respond for a server error. */
function internalServerError(req, res, reason) {
  var err = {id: 500, title: 'Internal Server Error', detail: reason.stack};

  res.out = {errors: [err], data: null};
  res.statusCode = err.id;

  respond.call(this, req, res, res.out);

  response('%d %s', res.statusCode, res.statusMessage);
  response('- out: %o', res.out);
}

/* Respond for a client error. */
function badRequest(req, res, reason) {
  var err = {id: 400, title: 'Bad Request', detail: reason.message};

  res.out = {errors: [err], data: null};
  res.statusCode = err.id;

  respond.call(this, req, res, res.out);

  response('%d %s', res.statusCode, res.statusMessage);
  response('- out: %o', res.out);
}

/* Respond to a valid request, but invalid payload. */
function unprocessableEntity(req, res, reason) {
  var err = {id: 422, title: 'Unprocessable Entity', detail: reason.message};

  res.out = {errors: [err], data: null};
  res.statusCode = err.id;

  respond.call(this, req, res, res.out);

  response('%d %s', res.statusCode, res.statusMessage);
  response('- out: %o', res.out);
}

/* Respond for a method that’s not allowed. */
function notAllowed(req, res, match, spec) {
  var err = {id: 405, title: 'Not allowed', detail: req.method + ' is not allowed for ' + req.url};
  var allow = allowed(spec);

  res.out = {errors: [err], data: null};
  res.statusCode = err.id;
  res.setHeader('Allow', allow.join(', '));

  respond.call(this, req, res, res.out);

  response('%d %s', res.statusCode, res.statusMessage);
  response('- out: %o', res.out);
}

/* Respond for a method that’s not allowed. */
function unauthorized(req, res) {
  var err = {id: 401, title: 'Unauthorized', detail: 'Missing or invalid credentials for resource requiring authentication'};

  res.out = {errors: [err], data: null};
  res.statusCode = err.id;

  respond.call(this, req, res, res.out);

  response('%d %s', res.statusCode, res.statusMessage);
  response('- out: %o', res.out);
}

/* Respond to OPTIONS. */
function options(req, res, match, spec) {
  var found = match.id ? db.has(match.id) : true;
  var code = found ? 200 : 404;
  var allow = found ? allowed(spec) : ['GET'];

  res.statusCode = code;
  res.setHeader('Allow', allow.join(', '));
  res.end();

  response('%d %s', res.statusCode, res.statusMessage);
  response('- out: %o', res.out);
}

/* Get a list of allowed methods from a spec. */
function allowed(spec) {
  var allow = [];
  var key;

  for (key in spec) {
    if (key.toUpperCase() === key) {
      allow.push(key);
    }
  }

  return allow;
}

function authorized(req) {
  var tokens = this.tokens;
  var prefix = 'token ';
  var header;

  if (tokens.length === 0) {
    return true;
  }

  header = req.headers.authorization;

  return Boolean(
    header &&
    header.slice(0, prefix.length) === prefix &&
    tokens.indexOf(header.slice(prefix.length)) !== -1
  );
}

/* Respond with JSON (or XML), and optionally encode the result. */
function respond(req, res, data) {
  var accept = accepts(req);
  var types = this.xmlEnabled ? accept.type(['json', 'xml']) : 'json';
  var stream = res;
  var method;
  var type;
  var value;

  /* Prefer gzip. */
  if (accept.encoding(['gzip'])) {
    method = 'gzip';
  } else if (accept.encoding(['deflate'])) {
    method = 'deflate';
  }

  if (types === 'xml') {
    type = 'application/xml';
    value = toXML(data);
  } else {
    type = 'application/json';
    value = JSON.stringify(data, null, 2) + '\n';
  }

  res.setHeader('Content-Type', type);

  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  if (method) {
    res.setHeader('Content-Encoding', method);
    res.removeHeader('Content-Length');
    stream = method === 'gzip' ? zlib.createGzip() : zlib.createDeflate();
    stream.pipe(res);
  }

  stream.end(value);
}

function toXML(value) {
  var errs = value.errors;
  var data = value.data;

  return jsontoxml([{
    name: 'root',
    children: {
      errors: array(errs, 'error'),
      data: Array.isArray(data) ? array(data, 'movie') : data
    }
  }], {
    prettyPrint: true,
    indent: '  '
  });

  function array(values, name) {
    return values.length ? list(values, name) : null;
  }

  function list(values, name) {
    var result = [];
    var length = values.length;
    var index = -1;

    while (++index < length) {
      result[index] = {name: name, children: values[index]};
    }

    return result;
  }
}
