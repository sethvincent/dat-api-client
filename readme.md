# dat-api-client

A JavaScript wrapper for dat's [REST API](https://github.com/maxogden/dat/blob/master/docs/rest-api.md).

[![NPM](https://nodei.co/npm/dat-api-client.png?global=true)](https://nodei.co/npm/dat-api-client/)

[![Travis](http://img.shields.io/travis/sethvincent/dat-api-client.svg?style=flat)](https://travis-ci.org/sethvincent/dat-api-client)

## Install

```
npm i --save dat-api-client
```

## Usage

```
var datAPI = require('dat-api-client')

var dat = datAPI({
  remote: 'http://127.0.0.1:6461',
  user: 'foo',
  pass: 'bar'
})
```