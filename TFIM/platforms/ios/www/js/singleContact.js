angular.module('singleContact', [])

.controller('singleContactCtrl', ['$scope', '$rootScope', '$stateParams', '$document', '$ionicLoading', function ($scope, $rootScope, $stateParams, $document, $ionicLoading) {
    //进入会话，初始化基础变量
    $scope.username = $stateParams.username;    //用户名称（昵称）
    $scope.targetid = $stateParams.targetid;    //用户ID（username）
    //进入会话后，不接收push消息，直接弹出消息内容
    window.JMessage.enterSingleConversation($scope.targetid, null, function () {
        console.log('进入'+$scope.username+'会话成功');
    }, function (errorStr) {
        $ionicLoading.show({
            template: errorStr,
            noBackdrop: true,
            duration: 1000
        });
    });
    //会话内容列表
    $scope.singleChats = new Array();
    //首次进入会话面板，获取历史消息50条并展示
    window.JMessage.getHistoryMessages('single', $scope.targetid, null, 0, 50, function (response) {
        $scope.singleChats = angular.fromJson(response);
        console.log($scope.singleChats);
        //发送广播事件singleContact.update
        $rootScope.$broadcast('singleContact.update');
    }, function (errorStr) {
        $ionicLoading.show({
            template: errorStr,
            noBackdrop: true,
            duration: 1000
        });
    });
    //接收到消息的消息触发事件
    $document.bind('jmessage.onReceiveMessage', function () {
        var newMsg = angular.fromJson(window.JMessage.message);
        console.log(newMsg);
        $scope.singleChats.push(newMsg);
        //发送广播事件singleContact.update
        $rootScope.$broadcast('singleContact.update');
    });
    //接收广播事件singleContact.update
    $scope.$on('singleContact.update', function (event) {
        //TODO 将滚动条置于最低部
    });

    $scope.sendSingleTextMessage = function (username, text) {
        window.JMessage.sendSingleTextMessage(username, text, null, function (response) {
            //alert('发送消息成功');
        }, function (errorStr) {
            alert('发送消息失败：' + errorStr);
        })
    };
}])