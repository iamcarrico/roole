'use strict';

var Node = require('../../node');
var Evaluator = require('../evaluator');

Evaluator.prototype.visitMember = function(memberNode) {
	var variableNode = memberNode.children[0];
	var variableName = variableNode.children[0];
	var number = memberNode.children[1];

	var valueNode = this.scope.resolve(variableName);

	if (!valueNode)
		throw new Err('$' + variableName + ' is undefined', variableNode, this.filePath);

  if (valueNode.type != 'list')
		throw new Err('$' + variableName + ' is not a list', variableNode, this.filePath);


  var listNodes = valueNode.children;

  listNodes.forEach(function(listNode, i){
    var childNode = listNode.children[0];

    if (listNode.type != "separator") {
      if (number == 0) {
        valueNode = Node.clone(listNode, false);

      }
      number --;
    }
  });


  return valueNode;

};