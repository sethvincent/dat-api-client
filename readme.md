# dat-api-client

A JavaScript wrapper for dat's [REST API](https://github.com/maxogden/dat/blob/master/docs/rest-api.md).

[![NPM](https://nodei.co/npm/dat-api-client.png?global=true)](https://nodei.co/npm/dat-api-client/)

[![Travis](http://img.shields.io/travis/sethvincent/dat-api-client.svg?style=flat)](https://travis-ci.org/sethvincent/dat-api-client)

## Install

```
npm i --save dat-api-client
```

## Usage

This api client can be used in the browser or in node, but it makes most sense to use in the browser with browserify.

```
var datAPI = require('dat-api-client')

var dat = datAPI({
  remote: 'http://127.0.0.1:6461',
  user: 'foo',
  pass: 'bar'
})
```

The methods of the API client closely mirror the Dat [REST API](https://github.com/maxogden/dat/blob/master/docs/rest-api.md) and [JS API](https://github.com/maxogden/dat/blob/master/docs/js-api.md). Read the [Dat docs](https://github.com/maxogden/dat/tree/master/docs) for more info.

## Methods

### dat.info(callback)

The callback gets `error`, `response`, and `body` arguments.

Example:

```
dat.info(function (err, res, body) {
  console.log(body)
})
```

### dat.get([key], options, callback)

If you specify a key, you get a specific row back. Leave the key out and you get multiple rows back that can be filtered using gt/lt/limit properties in the `options` object.

The callback gets `error`, `response`, and `body` arguments.

Example:

```
dat.get(key, function (err, res, body) {
  console.log(body)
})
```

### dat.put(key, data, callback)

Create or update a row.

The callback gets `error`, `response`, and `body` arguments.

Creating a row example:

```
dat.put({ example: 'some text' }, function (err, res, body) {
  console.log(body)
})
```

Updating a row example:

```
dat.get(key, function (err, res, row) {
  
  // make changes to row object
  
  dat.put(row, function (err, res, updatedRow) {
    console.log(updatedRow)
  })
})
```

### dat.delete(key, callback)

Delete a row.

Example:

```
dat.delete(key, function (err, res, body) {
  console.log(body)
})
```

### dat.changes(options, callback)

Get the latest changes from the Dat server.

### dat.bulk(data, options, callback)

Post newline-delimited json or csv to the Dat server. Specify the the type of data (either `'json'` or `'csv'` in the `options` object.

Example:

```
var data = "{ \"wee\": \"foo\"}\n{ \"woo\": \"boop\"}"

api.bulk(data, { type: 'json' }, function (err, res, body) {
  t.ifError(err)
  t.ok(body, 'bulk response ok')
  t.end()
})
```

