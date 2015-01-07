var os = require('os')
var path = require('path')
var test = require('tape')
var rimraf = require('rimraf')
var Dat = require('dat')
var datAPI = require('./')

var dir, dat, api

test('setup', function (t) {
  dir = path.join(os.tmpdir(), 'dat')

  var opts = {
    adminUser: 'foo',
    adminPass: 'bar'
  }

  dat = Dat(dir, opts, datReady)
  
  function datReady () {
    api = datAPI({
      url: 'http://127.0.0.1:6461',
      user: 'foo',
      pass: 'bar'
    })
    
    dat.listen(function () {
      t.end()
    })
  }
})

test('get api repo info', function (t) {
  api.info(function (err, res, body) {
    t.ifError(err)
    t.ok(body, 'api repo info response')
    t.end()
  })
})

test('create a row', function (t) {
  api.put({ wee: 'foo' }, function (err, res, body) {
    t.ifError(err)
    t.ok(body, 'post response body')
    t.equals(body.wee, 'foo')
    t.end()
  })
})

test('get rows', function (t) {
  api.get(function (err, res, rows) {
    t.ifError(err)
    t.ok(rows, 'rows object exists')
    t.end()
  })
})

test('get row', function (t) {
  api.put({ wee: 'foo' }, function (err, res, body) {
    api.get(body.key, function (err, res, row) {
      t.ifError(err)
      t.ok(row, 'row object exists')
      t.equals(row.wee, 'foo')
      t.end()
    })
  })
})

test('update a row', function (t) {
  api.put({ update: 'this row' }, function (err, res, body) {
    api.get(body.key, function (err, res, row) {
      row.update = 'this is updated'
      api.put(row, function (err, res, newrow) {
        t.equal(body.key, newrow.key)
        t.equal(newrow.update, 'this is updated')
        t.end()
      })
    })
  })
})

test('delete row', function (t) {
  api.put({ destroy: 'this row' }, function (err, res, body) {
    api.get(body.key, function (err, res, row) {
      t.ifError(err)
      t.ok(row)
      t.equals(row.destroy, 'this row')
      api.delete(row.key, function (err, res, body) {
        t.equal(body.deleted, true)
        t.end()
      })
    })
  })
})

test('post bulk ndjson data', function (t) {
  var data = "{ \"wee\": \"foo\"}\n{ \"woo\": \"boop\"}"

  api.bulk(data, { type: 'json' }, function (err, res, body) {
    t.ifError(err)
    t.ok(body, 'bulk response ok')
    t.end()
  })
})

test('post bulk csv data', function (t) {
  var csv = 'wee,woo\n1,a\n2,b\n3,c'

  api.bulk(csv, { type: 'csv' }, function (err, res, body) {
    t.ifError(err)
    t.ok(body, 'bulk response')
    t.end()
  })
})

test('teardown', function (t) {
  rimraf(dir, function () {
    dat.close()
    t.end()
  })
})
