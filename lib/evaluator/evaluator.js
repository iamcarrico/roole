/**
 * Evaluator
 *
 * Eliminate dynamic constructs (e.g., variable, @if, @for).
 */
'use strict';

var Visitor = require('../visitor');
var Scope = require('./scope');

var Evaluator = module.exports = function() {};

Evaluator.prototype = new Visitor();

Evaluator.prototype.evaluate = function(ast) {
	this.scope = new Scope();

	return this.visit(ast);
};

require('./node/root');
require('./node/ruleset');
require('./node/selector');
require('./node/selectorInterpolation');
require('./node/assignment');
require('./node/call');
require('./node/function');
require('./node/return');
require('./node/variable');
require('./node/memberExpression');
require('./node/identifier');
require('./node/string');
require('./node/range');
require('./node/logicalExpression');
require('./node/equalityExpression');
require('./node/relationalExpression');
require('./node/arithmeticExpression');
require('./node/unaryExpression');
require('./node/media');
require('./node/mediaQuery');
require('./node/mediaQueryInterpolation');
require('./node/void');
require('./node/block');
require('./node/if');
require('./node/for');
require('./node/mixin');
require('./node/keyframes');
require('./node/keyframe');
require('./node/fontFace');