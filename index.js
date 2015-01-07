var request = require('request')
var qs = require('querystring')
var btoa = require('btoa')
var debug = require('debug')('dat-api-client')
module.exports = DatAPI

function DatAPI (opts, cb) {
  if (!(this instanceof DatAPI)) return new DatAPI(opts, cb)
  this.url = opts.url
  // strip trailing slash
  if (this.url[this.url.length - 1] === '/') this.url = this.url.slice(0, this.url.length - 1)
  this.auth = 'Basic ' + btoa(opts.user + ':' + opts.pass)
}

DatAPI.prototype.info = function (cb) {
  return this._req('', 'GET', null, {}, cb)
}

DatAPI.prototype.get = function (key, opts, cb) {
  if (typeof key === 'function') {
    cb = key
    opts = {}
    return this._req('rows', 'GET', null, opts, cb)
  }

  if (typeof key === 'object') {
    cb = opts
    opts = key
    return this._req('rows', 'GET', null, opts, cb)
  }

  if (typeof key === 'string') {
    return this._req('rows/' + key, 'GET', null, opts, cb)
  }
}

DatAPI.prototype.put = function (data, opts, cb) {
  if (opts == 'function') {
    opts = { type: 'json' } // json by default
    cb = opts
  }
  return this._req('rows', 'POST', data, opts, cb)
}

DatAPI.prototype.delete = function (key, cb) {
  var uri = 'rows/' + key
  return this._req(uri, 'DELETE', null, {}, cb)
}

DatAPI.prototype.getBlob = function (opts, cb) {
  var uri = 'rows/' + opts.key + '/' + opts.filename
  return this._req(uri, 'GET', null, opts, cb)
}

DatAPI.prototype.postBlob = function (blob, opts, cb) {
  opts.timeout = 0
  var uri = 'rows/' + opts.key + '/' + opts.filename
  return this._req(uri, 'POST', blob, opts, cb)
}

DatAPI.prototype.diff =
DatAPI.prototype.changes = function (opts, cb) {
  return this._req('changes', 'GET', null, opts, cb)
}

DatAPI.prototype.csv = function (opts, cb) {
  return this._req('csv', 'GET', null, opts, cb)
}

DatAPI.prototype.bulk = function (data, opts, cb) {
  opts.timeout = 0
  opts.body = data
  return this._req('bulk', 'POST', null, opts, cb)
}

DatAPI.prototype.session = function (opts, cb) {
  return this._req('session', 'GET', null, opts, cb)
}

DatAPI.prototype.login = function (opts, cb) {
  return this._req('login', 'GET', null, opts, cb)
}

DatAPI.prototype.logout = function (cb) {
  return this._req('logout', 'GET', null, {}, cb)
}

DatAPI.prototype._req = function (resource, method, data, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    var opts = {}
  }

  opts || (opts = {})
  var query = opts.query || {}

  if (opts.limit) query.limit = opts.limit
  if (opts.start) query.start = opts.start
  if (opts.gt) query.gt = opts.gt
  if (opts.lt) query.lt = opts.lt
  if (opts.gte) query.gte = opts.gte
  if (opts.lte) query.lte = opts.lte
  if (opts.reverse) query.reverse = opts.reverse
  if (opts.version) query.version = opts.version
  if (opts.style) query.style = opts.style
  if (opts.since) query.since = opts.since
  if (opts.tail) query.tail = opts.tail
  if (opts.live) query.live = opts.live

  opts.uri = this.url + '/api/' + resource + '?' + qs.stringify(query)
  opts.method = method
  opts.headers = {}

  if (opts.type) {
    if (opts.type == 'csv') opts.headers['content-type'] = 'text/csv'
    if (opts.type == 'json') opts.headers['content-type'] = 'application/json'
  }
  else opts.json = true

  if (this.auth) opts.headers.authorization = this.auth
  if (data && opts.type != 'csv') opts.json = data

  debug('request', opts)

  return request(opts, cb)
}
