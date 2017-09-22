import test from 'ava';
import got from 'got';
import micro from 'micro';
import testListen from 'test-listen';
import m from '.';

const macro = async (t, opts, expected) => {
	const access = m(opts);
	const handler = () => ({});
	const url = await testListen(micro(access(handler)));
	t.is((await got(url, {json: true})).headers[opts.header], expected);
};

const envMacro = async (t, {env, header, value}, expected) => {
	const ENV = process.env[env];
	process.env[env] = value;
	const access = m();
	const handler = () => ({});
	const url = await testListen(micro(access(handler)));
	t.is((await got(url, {json: true})).headers[header], expected);
	process.env[env] = ENV;
};

test.serial('set allowCredentials', macro, {
	allowCredentials: true,
	header: 'access-control-allow-credentials'
}, 'true');

test.serial('omit setting allowCredentials if value is false', macro, {
	allowCredentials: false,
	header: 'access-control-allow-credentials'
}, undefined);

test.serial('set allowCredentials using env variable', envMacro, {
	env: 'ACCESS_ALLOW_CREDENTIALS',
	value: '1',
	header: 'access-control-allow-credentials'
}, 'true');

test.serial('omit setting allowCredentials if value is 0', envMacro, {
	env: 'ACCESS_ALLOW_CREDENTIALS',
	value: '0',
	header: 'access-control-allow-credentials'
}, undefined);

test('set allowHeaders', macro, {
	allowHeaders: ['Foo', 'Bar'],
	header: 'access-control-allow-headers'
}, 'Foo,Bar');

test('set allowHeaders using env variable', envMacro, {
	env: 'ACCESS_ALLOW_HEADERS',
	value: 'Foo,Bar',
	header: 'access-control-allow-headers'
}, 'Foo,Bar');

test('set allowMethods', macro, {
	allowMethods: ['GET', 'POST'],
	header: 'access-control-allow-methods'
}, 'GET,POST');

test('set allowMethods using env variable', envMacro, {
	env: 'ACCESS_ALLOW_METHODS',
	value: 'GET,POST',
	header: 'access-control-allow-methods'
}, 'GET,POST');

test('set maxAge', macro, {
	maxAge: 1024,
	header: 'access-control-max-age'
}, '1024');

test('set maxAge using env variable', envMacro, {
	env: 'ACCESS_MAX_AGE',
	value: '1024',
	header: 'access-control-max-age'
}, '1024');

test('set origin', macro, {
	origin: '*',
	header: 'access-control-allow-origin'
}, '*');

test('set origin using env variable', envMacro, {
	env: 'ACCESS_ORIGIN',
	value: '*',
	header: 'access-control-allow-origin'
}, '*');
