'use strict';

var Node = require('../../node');
var Evaluator = require('../evaluator');

Evaluator.prototype.visitMember = function(memberNode) {
	var variableNode = memberNode.children[0];
	var variableName = variableNode.children[0];
	var typeOfMember = memberNode.children[1];
	var memberExpression = memberNode.children[2];

	var valueNode = this.scope.resolve(variableName);

	if (!valueNode)
		throw new Err('$' + variableName + ' is undefined', variableNode, this.filePath);

  if (valueNode.type != 'list')
		throw new Err('$' + variableName + ' is not a list', variableNode, this.filePath);

  var listNodes = valueNode.children;
  var withoutSeparator = new Array();

  listNodes.forEach(function(listNode, i){
    if (listNode.type != "separator") {
      withoutSeparator.push(listNode);
    }
  });


  switch (typeOfMember) {

	case 'value':
	 if (memberExpression < 0) {
  	 memberExpression = withoutSeparator.length + memberExpression;
	 }

	  if (withoutSeparator.length <= memberExpression || memberExpression < 0) {
  	  valueNode = new Node('null', {loc: memberNode.loc});
	  } else {
  	  valueNode = Node.clone(withoutSeparator[memberExpression]);
	  }

	  return valueNode;

  case 'range':
    var range = Node.toListNode(memberExpression);
    valueNode = new Node('list', [], {loc: memberNode.loc});

    range.children.forEach(function(rangeNode, i){
      if (rangeNode.type != "separator") {
        valueNode.children.push(withoutSeparator[rangeNode.children[0]]);
      }
      else {
        valueNode.children.push(rangeNode);
      }
    });
  }

  return valueNode;

};