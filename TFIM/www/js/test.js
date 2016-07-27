angular.module('test', [])

.controller('testCtrl', ['$scope', function ($scope) {

    $scope.username = '';
    $scope.text = '';

    $scope.sendSingleTextMessage = function (username, text) {
        window.JMessage.sendSingleTextMessage(username, text, null, function (response) {
            //alert('发送消息成功');
        }, function (errorStr) {
            alert('发送消息失败：' + errorStr);
        })
    };
}])