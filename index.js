'use strict';
module.exports = opts => fn => (req, res) => {
	opts = Object.assign({}, opts);

	const allowCredentials = process.env.ACCESS_ALLOW_CREDENTIALS || opts.allowCredentials;
	const allowHeaders = process.env.ACCESS_ALLOW_HEADERS || opts.allowHeaders;
	const allowMethods = process.env.ACCESS_ALLOW_METHODS || opts.allowMethods;
	const maxAge = process.env.ACCESS_MAX_AGE || opts.maxAge;
	const origin = process.env.ACCESS_ORIGIN || opts.origin;

	if (allowCredentials) {
		const val = typeof allowCredentials === 'string' ? Number(allowCredentials) : allowCredentials;
		res.setHeader('access-control-allow-credentials', Boolean(val));
	}

	if (allowHeaders) {
		const val = Array.isArray(allowHeaders) ? allowHeaders.join(',') : allowHeaders;
		res.setHeader('access-control-allow-headers', val);
	}

	if (allowMethods) {
		const val = Array.isArray(allowMethods) ? allowMethods.join(',') : allowMethods;
		res.setHeader('access-control-allow-methods', val);
	}

	if (maxAge) {
		res.setHeader('access-control-max-age', String(maxAge));
	}

	if (origin) {
		res.setHeader('access-control-allow-origin', origin);

		if (origin !== '*') {
			res.setHeader('vary', 'origin');
		}
	}

	return fn(req, res);
};
