
function TokenCtrl($scope) {

var strText = $scope.inputText || "Mary has a little lamb.";
$scope.tokens = strText
	.replace(/[^\w\s]|_/g, function ($1) { 
											return ' ' + $1 + ' ';
										}).replace(/[ ]+/g, ' ').trim().split(/ /);


$scope.runText = function() {
strText = $scope.inputText || "Mary has a little lamb.";
$scope.tokens = strText
	.replace(/[^\w\s]|_/g, function ($1) { 
											return ' ' + $1 + ' ';
										}).replace(/[ ]+/g, ' ').trim().split(/ /);
};







}
