var test = require('tape');
var DatAPI = require('./')

var dat = DatAPI({
  url: 'http://127.0.0.1:6461',
  user: 'foo',
  pass: 'bar'
})

test('get dat repo info', function (t) {
  dat.info(function (err, res, body) {
    t.ifError(err)
    t.ok(body, 'dat repo info response')
    t.end()
  })
})

test('post rows', function (t) {
  dat.put({ wee: 'foo' }, function (err, res, body) {
    t.ifError(err)
    t.ok(body, 'post response body')
    t.equals(body.wee, 'foo')
    t.end()
  })
})

test('get rows', function (t) {
  dat.get(function (err, res, rows) {
    t.ifError(err)
    t.ok(rows, 'rows object exists')
    t.end()
  })
})

test('get row', function (t) {
  dat.put({ wee: 'foo' }, function (err, res, body) {
    dat.get(body.key, function (err, res, row) {
      t.ifError(err)
      t.ok(row, 'row object exists')
      t.equals(row.wee, 'foo')
      t.end()
    })
  })
})

test('post bulk ndjson data', function (t) {
  var data = "{ \"wee\": \"foo\"}\n{ \"woo\": \"boop\"}"

  dat.bulk(data, { type: 'json' }, function (err, res, body) {
    t.ifError(err)
    t.ok(body, 'bulk response ok')
    t.end()
  })
})

test('post bulk csv data', function (t) {
  var csv = 'wee,woo\n1,a\n2,b\n3,c'

  dat.bulk(csv, { type: 'csv' }, function (err, res, body) {
    t.ifError(err)
    t.ok(body, 'bulk response')
    t.end()
  })
})
