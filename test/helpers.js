// Minimal Mocha setup for Node 22
const chai = require('chai');
const sinon = require('sinon');

global.expect = chai.expect;
global.sinon = sinon;

// Load your implementation and expose functions as globals for the tests
const impl = require('../index.js');
Object.assign(global, impl);
