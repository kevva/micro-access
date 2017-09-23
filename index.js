'use strict';
const controlAccess = require('control-access');

module.exports = opts => fn => (req, res) => {
	controlAccess(opts)(req, res);
	return fn(req, res);
};
