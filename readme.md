# dat-api-client

A wrapper for the dat rest API.

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