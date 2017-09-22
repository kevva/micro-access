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

##### allowCredentials

Type: `boolean`

The [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials) header Indicates whether or not the response to the request can be exposed when the credentials flag is true.

Can be set globally with the `ACCESS_ALLOW_CREDENTIALS` environment variable. Possible values are `1` and `0`.

##### allowHeaders

Type: `Array`

The [`Access-Control-Allow-Headers`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers) header is used in response to a preflight request to indicate which HTTP headers can be used when making the actual request.

Can be set globally with the `ACCESS_ALLOW_HEADERS` environment variable using a comma delimited string.

##### allowMethods

Type: `Array`

The [`Access-Control-Allow-Methods`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods) header specifies the method or methods allowed when accessing the resource.

Can be set globally with the `ACCESS_ALLOW_METHODS` environment variable using a comma delimited string.

##### maxAge

Type: `number`

The [`Access-Control-Max-Age`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age) header indicates how long the results of a preflight request can be cached.

Can be set globally with the `ACCESS_MAX_AGE` environment variable.

##### origin

Type: `string`

The [`origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) parameter specifies a URI that may access the resource.

Can be set globally with the `ACCESS_ORIGIN` environment variable.

#### handler

Type: `Function`

The request handler to wrap.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
