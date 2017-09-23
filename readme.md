# micro-access [![Build Status](https://travis-ci.org/kevva/micro-access.svg?branch=master)](https://travis-ci.org/kevva/micro-access)

> Easy CORS handling for [`micro`](https://github.com/zeit/micro)


## Install

```
$ npm install micro-access
```


## Usage

```js
const {json, send} = require('micro');
const microAccess = require('micro-access');

module.exports = microAccess()(async (req, res) => {
	const body = await json(req);
	send(res, 200, body);
});
```


## API

### microAccess([options])(handler)

#### options

Type: `Object`

Same as [`control-access`](https://github.com/kevva/control-access#options).

#### handler

Type: `Function`

The request handler to wrap.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
