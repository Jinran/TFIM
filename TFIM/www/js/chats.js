angular.module('chats', [])

.controller('chatsCtrl', ['$scope', '$document', '$ionicLoading', '$rootScope', 'Chat', function ($scope, $document, $ionicLoading, $rootScope, Chat) {
    $scope.chatList = new Array();
    $scope.$on('chats.update', function (event) {
        $scope.chatList = Chat.chats();
        
        $scope.$apply();
    });

    $scope.doRefresh = function () {
        //取得会话列表
        $scope.chatList = Chat.updateChats(function (response) {
            console.log(response);
        }, function (errorStr) {
            $ionicLoading.show({
                template: errorStr,
                noBackdrop: true,
                duration: 1000
            });
        });

        $scope.$broadcast('scroll.refreshComplete');
    };
    //首次进入刷新，获取历史消息
    $scope.doRefresh();
    //进入会话
    $scope.enterChat = function () {

    };
    $scope.remove = function (username) {
        window.JMessage.deleteSingleConversation(username, $rootScope.appKey, function () {
            //取得会话列表
            $scope.chatList = Chat.updateChats(function (response) {
                //console.log(response);
            }, function (errorStr) {
                $ionicLoading.show({
                    template: errorStr,
                    noBackdrop: true,
                    duration: 1000
                });
            });
        }, function (errorStr) {
            $ionicLoading.show({
                template: errorStr,
                noBackdrop: true,
                duration: 1000
            });
        })
    };

    //全局监听事件，监听广播获取的消息
    $document.bind('jmessage.onReceiveMessage', function () {
        //取得会话列表
        $scope.chatList = Chat.updateChats(function (response) {
            //console.log(response);
        }, function (errorStr) {
            $ionicLoading.show({
                template: errorStr,
                noBackdrop: true,
                duration: 1000
            });
        });
    });
}])