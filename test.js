var test = require('tape');
var DatAPI = require('./')

var dat = DatAPI({ 
  remote: 'http://127.0.0.1:6461',
  user: 'foo',
  pass: 'bar'
})

test('get dat repo info', function (t) {
  dat.info(function (err, res, body) {
    t.ok(body, 'dat repo info response')
    t.end()
  })
})

test('post rows', function (t) {
  dat.postRows({ wee: 'foo' }, function (err, res, body) {
    t.ok(body, 'post response body')
    t.equals(body.wee, 'foo')
    t.end()
  })
})

test('get rows', function (t) {
  dat.rows(function (err, res, rows) {
    t.ok(rows, 'rows object exists')
    t.end()
  })
})

test('get row', function (t) {
  dat.postRows({ wee: 'foo' }, function (err, res, body) {
    dat.row(body.key, function (err, res, row) {
      t.ok(row, 'row object exists')
      t.equals(row.wee, 'foo')
      t.end()
    })
  })
})

test('post bulk csv data', function (t) {
  var csv = 'wee,woo\n1,a\n2,b\n3,c'

  dat.bulk(csv.toString(), { type: 'csv' }, function (err, res, body) {
    console.log(body)
    t.ok(body, 'bulk response body')
    t.end()
  })
})
